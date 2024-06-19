const { PrismaClient } = require("@prisma/client");
const shipment = require("../../stripe");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const verifyToken=require('../../verifyToken')
const makeOrder = async (req, reply) => {
  const { orderItems } = req.body;

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
      orderItems.forEach(async (item) => {
        await prisma.orderItem.create({
          data: {
            price: Number(item.price),
            quentity: item.quentity,
            product: { connect: { id: item.productId }},
            order: { connect: { id: order.id }}
          },
        });
      });
      await prisma.shipment.create({
        data: { orderID: order.id, shipmentDate: new Date() },
      });
      try {
        const res = await fetch(
          "https://local-stg.epservices.ae/api/Shipments/create",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-api-key":"23ba3fccc642a478c192e823f7c3d413:a51a45a8abf84994a19a1dfb0f044c4e",
              'Password': "C175120",
            },
            body: JSON.stringify(order),
            mode: "cors",
          }
        );
        const data=await res.json()
        console.log(data,"data")
      } catch (error) {
        console.log(error)
      }
 
      reply
        .status(200)
        .send({ message: "successfully registered the order", order });
    } catch (error) {
      console.log(error);
      reply.status(500).send({ message: "internal server error" });
    }
  }
};
module.exports = makeOrder;
