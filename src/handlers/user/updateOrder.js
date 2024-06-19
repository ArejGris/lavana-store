const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const updateOrder=async(req,reply)=>{
    const {id}=req.params
    await prisma.order.update({where:{id},data:{}})
    await prisma.orderItem.deleteMany({where:{orderId:id}})
    return reply.send({status:200,message:"order updated"})
    
}
module.exports=updateOrder