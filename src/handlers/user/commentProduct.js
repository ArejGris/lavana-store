const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const commentProduct = async ( req, reply) => {
  const { id } = req.params;
  const { userId, comment } = req.body;
  try {
    const product = await prisma.product.findUnique({ where:{id: Number(id)} });
    if (!product) {
      reply.send({ status: 404, message: "product not found" });
    } else {
      const thecomment = await prisma.comment.create({
        customer: userId,
        content: comment,
      });
      await prisma.commentUser.create({data:{
        customerId: userId,
        commentId: thecomment.id,
        productId: id,
      }});
    }
    reply.send({ status: 200, message: "your comment added successfully" });
  } catch (error) {
    reply.status(500).send({ message: "internal server error" });
  }
};
module.exports = commentProduct;
