const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const { generateAccessToken, generateRefreshToken } = require("../../auth2");
const prisma = new PrismaClient();
const tokenreq = async (fastify, req, reply) => {
 
    
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN
  let user2
try {
  
 user2= jwt.verify(token, "secretkeytwo");
} catch (error) {
 return reply.send({ status: 400, message: "bad request" });
}
user2= jwt.decode(token, "secretkeytwo");
   // If verification fails, return Forbidden status
const user=await prisma.user.findUnique({where:{id:user2.userId}})

    console.log(user, "user");
    if (user) {
      const newtoken = generateAccessToken(user.id);

      const refreshToken = generateRefreshToken(user.id);
      console.log(newtoken, refreshToken, "compare two token");
      const decode = jwt.decode(newtoken);
      const date = new Date(decode.iat * 1000);
      await prisma.user.update({
        where: { id: user.id },
        data: { tokenDate: date },
      });
      await prisma.session.create({data:{
        customer:{connect:{id:user.id}},
        tokenDate:date
       }})
      console.log(refreshToken, token, user, "all data");
      return reply.send({ status: 200, token: newtoken, refreshToken });
      
    } else {
      return reply.send({ status: 404, message: "user not found" });
    }
  

};
module.exports = tokenreq;
