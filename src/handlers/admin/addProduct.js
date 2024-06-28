const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const addProduct = async (req, reply) => {
  const { categories, price, size, description,description2, keyWord,keyWord2, images } = req.body;
  console.log(categories, price, size, description, keyWord, images);
  if (!price || !keyWord || !description || !size) {
    reply.send({ message: "must be complete information" });
    return;
  }

  try {
    const product = await prisma.product.create({
      data: {
        price:Number(price),
        size,
        description,
        description2:description2||null,
        keyWord,
        keyWord2:keyWord2||null,
        images,
      },
    });
    console.log(product);

    if (categories.length > 0 && product) {
      const p = await prisma.product.findUnique({ where: { id: product.id } });
      categories.forEach(async (cat) => {
        await prisma.productCategory.create({
          data: {
            category: { connect: { id: cat } },
            product: { connect: { id: p.id } },
          },
        });
      });
    }
    reply
      .status(200)
      .send({ message: "successfully added the product", product });
  } catch (error) {
    console.log(error);
    reply.status(500).send({ message: "intrnal server error" });
  }
};
module.exports = addProduct;
