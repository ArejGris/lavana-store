const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const getProducts = async ( req, reply) => {
  
    try {
      const products=  await prisma.product.findMany({})
      
      reply.status(200).send({products})
    } catch (error) {
        reply.status(500).send({message:"internal server error"})
   
    }
 
  };
  module.exports =  getProducts ;