const { PrismaClient } = require("@prisma/client");
const shipment = require("../../stripe");
const prisma = new PrismaClient();
const makeOrder = async (req, reply) => {
  const { userID, orderItems } = req.body;
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
    reply.send({ status: 401, message: "prices dont match the stored prices" });
  }
  if (compareprice) {
    const items = orderItems.map(async(item) => {
      const product =await prisma.product.findUnique({where:{ id: item.productId }});
      return {
        name: product.keyWord,
        price: product.price,
        quentity:item.quentity,
      };
    });
    const ship = await shipment(items);
   
    if (ship.status !== 200) {
      reply.send({ status: 500, message: "internal server error" });
    } else {
      reply.send({url:ship.url})
    }

  }
};
module.exports = makeOrder;
