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
    images
  } = req.body;
  if (!categories && !price && !size && !descrition&&!keyWord && !images){
reply.send({message:"no data for update"})
    }
 let imgStr=''
 images.forEach(img => {
  imgStr+=img+' '
 });
    try {
        const product=await prisma.product.findUnique({where:{id:Number(id)}})
      const updatedproduct = await prisma.product.update({
        where: { id: Number(id) },
        data: {
            price:Number(price),
            size:size,
            descrition:descrition,
            keyWord:keyWord,
            images:imgStr},
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
