const { PrismaClient } = require("@prisma/client");
const jwt=require('jsonwebtoken')
const prisma = new PrismaClient();
const tokenverify = async (fastify, req, reply) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN
  try {
    jwt.verify(token,'secretkeyadmin')
  } catch (error) {
    
return reply.send({status:403,message:"admin not verfied"})
  }
  const data= jwt.decode(token,'secretkeyadmin')
  console.log(data)
const admin=await prisma.admin.findUnique({where:{id:data.userId}})
if(admin){
    reply.send({status:200,message:"admin verfied"})
  }
    else{
reply.send({status:403,message:"admin not verfied"})
    }
}
  module.exports = tokenverify;
  