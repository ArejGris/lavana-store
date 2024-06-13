const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const deleteOrder=async(req,reply)=>{
    const {id}=req.params
    try {
        
    await prisma.orderItem.deleteMany({where:{orderId:id}})
    await prisma.shipment.delete({where:{orderID:id}})
    await prisma.order.delete({where:{id:id}})
    return reply.send({status:200,message:"order deleted"})
    } catch (error) {
        
    return reply.send({status:500,message:"error occured"})
    }
    
}
module.exports=deleteOrder