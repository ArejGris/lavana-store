const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const {  generateRefreshToken } = require("../../auth2");
const prisma = new PrismaClient();
const refreshtoken = async (req, reply) => {
 
    
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN
try {
  jwt.verify(token, "secretkeyadmin");
} catch (error) {
  console.log(error)
  reply.send({status:400,message:"bad token"})
}
const user2= jwt.decode(token, "secretkeyadmin");
   // If verification fails, return Forbidden status
const admin=await prisma.admin.findUnique({where:{id:user2.userId}})

    console.log(admin, "user");
    if (admin) {
      const refreshToken = generateRefreshToken(admin.id);
      console.log(refreshToken, "compare two token");
      
     return reply.send({ status: 200,admin,token: refreshToken });
      
    } else {
      return reply.send({ status: 404, message: "user not found" });
    }
  

};
module.exports = refreshtoken;
