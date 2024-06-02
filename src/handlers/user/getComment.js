const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const getComment = async (req, reply) => {
  const { id } = req.params;
  try {
    const comments = await prisma.commentUser.findMany({
      where: { productId: Number(id) },
    });
    if (!comments) {
      reply.status(404).send({ message: "product not found" });
    }
    const allrows = comments.map((comment) => comment.commentId);
   const mycomments= await prisma.comment.findMany({
      where: {
        id: {
          in: allrows,
        },
      },
    });
    reply.status(200).send({ comments:mycomments });
  } catch (error) {
    reply.status(500).send({ message: "internal server error" });
  }
};
module.exports = getComment;
