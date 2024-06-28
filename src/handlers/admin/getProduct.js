const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const getProduct = async ( req, reply) => {
    const { id } = req.params;
    try {
      const product=  await prisma.product.findUnique({where:{id:Number(id)}})
      if(!product){
       return reply.status(404).send({message:"product not found"})
      }
     const cats=await prisma.productCategory.findMany({where:{productId:Number(id)}})
     const categories=cats.map(cat=>cat.categoryId)
     const cathh=await prisma.category.findMany({where:{id:{in:categories}}})
     return reply.status(200).send({product,categories:cathh})
    } catch (error) {
       return reply.status(500).send({message:"internal server error"})
   
    }
 
  };
  module.exports =  getProduct ;