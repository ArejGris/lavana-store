const { PrismaClient } = require("@prisma/client");
const verifyToken = require("../../verifyToken");
const jwt=require('jsonwebtoken')
const prisma = new PrismaClient();
const reviewProduct = async (req, reply) => {
  const { id } = req.params;
  const { val } = req.body;
  
 const res=await verifyToken(req)
if(!res.token){
  return reply.send(res);
}
const token=res.token
  try {
  const  user2 = jwt.decode(token, "secretkeyone");
    const userId=user2.userId
    const alreadyReview=await prisma.review.findMany({where:{userID:userId,productId:Number(id)}})
    if(alreadyReview.length>0){
      const id=alreadyReview[0].id
      await prisma.review.update({
        where:{id},
        data: {
          val:Number(val),

        },
      });
      return reply.send({status:200,message:"product review updated"})
    }
    const review = await prisma.review.create({
      data: {
        val:Number(val),
        customer: { connect: { id: userId } },
        product: { connect: { id: Number(id) } },
      },
    });
    reply.send({ status:200,message: "succesfully review the product", review });
  } catch (error) {
    console.log(error,"error")
    reply.status(500).send({ message: "internal server error" });
  }
};
module.exports = reviewProduct;
