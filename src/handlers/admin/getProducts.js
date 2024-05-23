const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const getProducts = async ( req, reply) => {
  
    try {
      const products=  await prisma.product.findMany({})
      const products2=products.map(product=>{
        const images=product.images.split(" ")
        return {...product,images}
      })
      reply.send({status:200,products:products2})
    } catch (error) {
        reply.status(500).send({message:"internal server error"})
   
    }
 
  };
  module.exports =  getProducts ;