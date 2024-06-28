const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const getCategory = async (req, reply) => {
  const { id } = req.params;
  console.log(id);
  try {
    const cat =await prisma.category.findUnique({where:{id:Number(id)}})
    const products1 = await prisma.productCategory.findMany({
      where: { categoryId: Number(id) },
      select: { productId: true },
    });
    const productArray = products1.map((p) => p.productId);
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productArray,
        },
      },
    });
    reply.send({ status: 200, products,cat });
  } catch (error) {
    console.log(error);
    reply.status(500).send({ message: "internal server error" });
  }
};
module.exports = getCategory;
