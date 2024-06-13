const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const getUserOrder = async (req, reply) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1]; // Bearer TOKEN
  console.log(token, "token");
  const decode=jwt.decode(token, "secretkeyone")
  const id=decode.userId
  console.log(id,"id the user id")

  try {
  const   allorders = await prisma.order.findMany({
      where: { userID: id },
    });
    if(allorders.length==0){
      return reply.send({status:404,message:"no order for the user id"})
    }
   
// const orderIds=allorders.map(order=>order.id)
const promises=allorders.map(async(order)=>{
  const id=order.id
 const items= await prisma.orderItem.findMany({where:{orderId:id}})
 const promise=items.map(async(item)=>{
 const product= await prisma.product.findUnique({where:{id:item.productId}})
  return {
    title:product.keyWord,
    description:product.description,
    price:item.price,
    quentity:item.quentity
  }
 })
 results=await Promise.all(promise)
return {
  id,
  date:order.orderDate,
  items:results

}
})
orders=await Promise.all(promises)

  return reply.send({ status: 200, orders });
  } catch (error) {
    console.log(error,"error")
  }
};
module.exports = getUserOrder;
