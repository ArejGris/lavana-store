const { PrismaClient } = require("@prisma/client");
const shipment = require("../../stripe");
const prisma = new PrismaClient();
const makeOrder = async (req, reply) => {
 try {
  await req.jwtVerify()
 } catch (err) {
  console.log(err,"err")
 return  reply.send({status:403,message:"not authorized"})
 }
  const { userId, orderItems } = req.body;
  console.log(orderItems)
  let compareprice = true;
  let order
  orderItems.forEach(async(item) => {
    const product =await prisma.product.findUnique({where:{ id: Number(item.productId )}});
    console.log(product)
    if (product.price !== Number(item.price)) {
      compareprice = false;
    }
  });
  if (!compareprice) {
   return reply.send({ status: 401, message: "prices dont match the stored prices" });
  }
  if (compareprice) {
   /*  const items = orderItems.map(async(item) => {
      const product =await prisma.product.findUnique({where:{ id: item.productId }});
      return {
        name: product.keyWord,
        price: product.price,
        quentity:item.quentity,
      };
    });
    //const ship = await shipment(items);
   await registerOrder(userID,orderItems)
 */
const user=await prisma.user.findUnique({where:{id:userId}})
if(!user||!user.confirmNumber){
  
 return reply.send({ status: 403, message: "your account is not confirmed" });
}
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
};
module.exports = makeOrder;
