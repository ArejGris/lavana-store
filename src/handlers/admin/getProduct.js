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
     
      reply.status(200).send({product})
    } catch (error) {
        reply.status(500).send({message:"internal server error"})
   
    }
 
  };
  module.exports =  getProduct ;