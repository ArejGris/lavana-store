const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const confirmUser=async(req,reply)=>{
const user=req.body
try {
    
await prisma.user.update({where:{id:user.id},data:{confirmNumber:true}})
reply.send({status:200,message:"user confirmed"})
} catch (error) {
    reply.send({status:200,message:"internal server error"})
}
}
module.exports=confirmUser