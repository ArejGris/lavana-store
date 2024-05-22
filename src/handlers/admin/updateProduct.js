const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const updateProduct = async ( req, reply) => {
  const { id } = req.params;
  const {
    categories,
    price,
    size,
    descrition,
    keyWord,
    image1,
    image2,
    image3,
    image4,
    image5,
  } = req.body;
  if (!categories && !price && !size && !descrition&&!keyWord && !image1 && !image2 && !image3 && !image4 && !image5){
reply.send({message:"no data for update"})
    }
  
    try {
        const product=await prisma.product.findUnique({where:{id:Number(id)}})
      const updatedproduct = await prisma.product.update({
        where: { id: Number(id) },
        data: {
            price:Number(price),
            size:size,
            descrition:descrition,
            keyWord:keyWord,
            image1:image1,
            image2:image2,
            image3:image3,
            image4:image4,
            image5:image5},
      });
      reply
        .status(200)
        .send({ message: "succesfully update the product", updatedproduct });
    } catch (error) {
      console.log(error)
      reply.status(500).send({ message: "internal server error" });
    }
};
module.exports = updateProduct;
