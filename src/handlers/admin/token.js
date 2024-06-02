const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const token = async (fastify, req, reply) => {
  const data= await req.jwtVerify()
  console.log(data)
const admin=await prisma.admin.findUnique({where:{id:data.userId}})
if(admin){
    reply.send({status:200,message:"admin verfied"})
  }
    else{
reply.send({status:403,message:"admin not verfied"})
    }
}
  module.exports = token;
  