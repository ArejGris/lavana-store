const { PrismaClient } = require("@prisma/client");
const prisma=new PrismaClient()
const registerOrder = async(req,reply) => {
  const {userId,orderItems}=req.body
  try {
    const order = await prisma.order.create({
      data: {
        userID:userId,
        orderDate: new Date(),
      },
    });
    orderItems.forEach(async(item) => {
     await prisma.orderItem.create({
        data: {
          orderId: order.id,
          productId: item.productId,
          price: Number(item.price),
          quentity: item.quentity,
        },
      });
    });
   await prisma.shipment.create({
      data: { orderID: order.id, shipmentDate: new Date() },
    });
    reply.status(200).send({message:"successfully registered the order",order})
  } catch (error) {
    console.log(error)
    reply.status(500).send({message:"internal server error"})
  }
 
}
 
module.exports= registerOrder;
