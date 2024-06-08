const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const {  generateRefreshToken } = require("../../auth2");
const prisma = new PrismaClient();
const refreshtoken = async (req, reply) => {
 
    
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN
try {
  jwt.verify(token, "secretkeyone");
} catch (error) {
  return reply.send({status:403,message:"token error"})
}
const user2= jwt.decode(token, "secretkeyone");
   // If verification fails, return Forbidden status
const user=await prisma.user.findUnique({where:{id:user2.userId}})

    console.log(user, "user");
    if (user) {
      const refreshToken = generateRefreshToken(user.id);
      console.log(refreshToken, "compare two token");
      
      reply.send({ status: 200,token: refreshToken });
      
    } else {
       reply.send({ status: 404, message: "user not found" });
    }
  

};
module.exports = refreshtoken;
