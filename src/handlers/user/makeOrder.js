const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const verifyToken=require('../../verifyToken')
const makeOrder = async (req, reply) => {
  const { orderItems ,copon} = req.body;

  const res=await verifyToken(req)
if(!res.token){
  return reply.send(res);
}
const token=res.token
const  user2 = jwt.decode(token, "secretkeyone");
  let compareprice = true;
  orderItems.forEach(async (item) => {
    const product = await prisma.product.findUnique({
      where: { id: Number(item.productId) },
    });

    if (product.price !== Number(item.price)) {
      compareprice = false;
    }
  });
  if (!compareprice) {
    return reply.send({
      status: 401,
      message: "prices dont match the stored prices",
    });
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
    const user = await prisma.user.findUnique({ where: { id: user2.userId } });
    if (!user || !user.confirmNumber) {
      return reply.send({
        status: 403,
        message: "your account is not confirmed",
      });
    }
    try {
      const order = await prisma.order.create({
        data: {
          userID: user2.userId,
          orderDate: new Date(),
        },
      });
      let totalprice=0
      orderItems.forEach(async (item) => {
        totalprice+=item.quentity* Number(item.price)
        await prisma.orderItem.create({
          data: {
            price: Number(item.price),
            quentity: item.quentity,
            product: { connect: { id: item.productId }},
            order: { connect: { id: order.id }}
          },
        });
      });
      if(copon){
      const registeredcopon=  await prisma.copon.findUnique({where:{code:copon}})
        if(registeredcopon){
         totalprice-= totalprice*Number(registeredcopon.discount/100)
        }
      }
      return reply.send({status:200,message:"enter info for shipment"})
    } catch (error) {
      console.log(error);
      reply.status(500).send({ message: "internal server error" });
    }
  }
};
module.exports = makeOrder;
