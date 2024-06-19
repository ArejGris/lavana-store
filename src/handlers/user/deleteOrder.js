const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const deleteOrder=async(req,reply)=>{
    const {id}=req.params
    const res=await verifyToken(req)
    if(!res.token){
      return reply.send(res);
    }
    try {
     const order=  await prisma.order.findUnique({where:{id:id}})
    await prisma.orderItem.deleteMany({where:{orderId:id}})
    await prisma.shipment.delete({where:{orderID:id}})
    await prisma.order.delete({where:{id:id}})
    
    await fetch('https://local-stg.epservices.ae/api/Shipments/cancel?awb=1000003886384',{
        method:"POST",
        headers:{
           'Content-Type' : 'application/json', 
           'x-api-key': '23ba3fccc642a478c192e823f7c3d413:a51a45a8abf84994a19a1dfb0f044c4e',
           'Password': 'C175120'
        },
        body:JSON.stringify({orderId:id,date:order.orderDate,userId:order.userID})
    })
    return reply.send({status:200,message:"order deleted"})
    } catch (error) {
        
    return reply.send({status:500,message:"error occured"})
    }
    
}
module.exports=deleteOrder