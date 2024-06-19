const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const getProducts = async ( req, reply) => {
  
    try {
      const products=  await prisma.product.findMany({})
      
      reply.send({status:200,products:products})
    } catch (error) {
      console.log(error,"error")
        reply.status(500).send({message:"internal server error"})
   
    }
 
  };
  module.exports =  getProducts ;