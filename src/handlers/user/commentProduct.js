const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const commentProduct = async ( req, reply) => {
  const { id } = req.params;
  console.log(id,"hii")
  const { productId,userId, comment } = req.body;
  try {
    const product = await prisma.product.findUnique({ where:{id: productId} });
    const user = await prisma.user.findUnique({ where:{id: userId} });
   

    if (!product||!user) {
      reply.send({ status: 404, message: "product not found" });
    } else {
      const username=user.firstName+" "+user.lastName
      console.log(username,comment)
      const thecomment = await prisma.comment.create({data:{
        customer: username,
        content: comment
      }});
      await prisma.commentUser.create({data:{
        customer: {connect:{id:userId}},
        comment: {connect:{id:thecomment.id}},
        product: {connect:{id:product.id}},
      }});
    }
    reply.send({ status: 200, message: "your comment added successfully" });
  } catch (error) {
    console.log(error)
    reply.status(500).send({ message: "internal server error" });
  }
};
module.exports = commentProduct;
