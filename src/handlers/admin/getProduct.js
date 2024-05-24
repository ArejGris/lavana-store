const { PrismaClient } = require("@prisma/client");
const axios=require('axios')
const prisma = new PrismaClient();
const getProduct = async ( req, reply) => {
    const { id } = req.params;
    try {
      const product=  await prisma.product.findUnique({where:{id:Number(id)}})
      if(!product){
        reply.status(404).send({message:"product not found"})
      }
      const images=product.images.split(" ")
      
      const product2={...product,images}
      reply.status(200).send({product:product2})
    } catch (error) {
        reply.status(500).send({message:"internal server error"})
   
    }
 
  };
  module.exports =  getProduct ;