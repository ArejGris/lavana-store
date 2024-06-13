const { PrismaClient } = require("@prisma/client");
const shipment = require("../../stripe");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const makeOrder = async (req, reply) => {
  const { orderItems } = req.body;

  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1]; // Bearer TOKEN
  console.log(token, "token");
  if (!token) return reply.send({ status: 400, message: "bad request" }); // If no token, return Unauthorized status
  let user2;
  try {
    user2 = jwt.verify(token, "secretkeyone");
    console.log(user2, "user token");
    const createdAt = new Date(user2.iat * 1000);
    const user = await prisma.user.findUnique({ where: { id: user2.userId } });
    if (user.tokenDate.toISOString() !== createdAt.toISOString()) {
      console.log("hello world");
      const session = await prisma.session.findUnique({
        where: { userId: user2.userId },
      });
      console.log(session.tokenDate, "tokenDate");
      console.log(createdAt, "created at");
      if (
        !session ||
        session.tokenDate.toISOString() !== createdAt.toISOString()
      ) {
        return reply.send({
          status: 400,
          message: "date of token not verified",
        });
      }
    }
  } catch (err) {
    if (err && err.message == "jwt expired") {
      //check date of token create

      user2 = jwt.decode(token, "secretkeyone");
      console.log(user2, "user token");
      const createdAt = new Date(user2.iat * 1000);
      console.log(createdAt, "createedAt");
      const user = await prisma.user.findUnique({
        where: { id: user2.userId },
      });
      console.log(user.tokenDate, "token date");
      if (user.tokenDate.toISOString() !== createdAt.toISOString()) {
        console.log("the token isn'nt compitable with the date stored in db")
        const session = await prisma.session.findUnique({
          where: { userId: user2.userId },
        });
        if (session.tokenDate.toISOString() !== createdAt.toISOString()) {
          console.log("hello");
          return reply.send({
            status: 400,
            message: "date of token not verified",
          });
        }else{
          console.log("the token compitable with the date stored in db")
        }
      }
      return reply.send({ status: 300, message: "send refresh token" });
    }
    if (err) {
      return reply.send({ status: 403, message: "fail to verify token" });
    }
  }

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
