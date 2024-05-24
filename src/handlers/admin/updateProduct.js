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

    try {
        const product=await prisma.product.findUnique({where:{id:Number(id)}})
        if(!product){
          return  reply.send({status:404,message:"no product found"})
        }
        await prisma.productCategory.deleteMany({where:{productId:Number(id)}})
      const updatedproduct = await prisma.product.update({
        where: { id: Number(id) },
        data: {
            price:Number(price),
            size:size,
            descrition:descrition,
            description2:"",
            keyWord:keyWord,
            keyWord2:"",
            images},
      });
      categories.forEach(async(cat)=> {
        await prisma.productCategory.create({
         data:{ category:{connect:{id:cat}},product:{connect:{id:p.id}}}
         })}
       );
      reply
        .status(200)
        .send({ message: "succesfully update the product", updatedproduct });
    } catch (error) {
      console.log(error)
      reply.status(500).send({ message: "internal server error" });
    }
};
module.exports = updateProduct;
