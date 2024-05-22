const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const getProduct = async ( req, reply) => {
    const { id } = req.params;
    try {
      const reviews=  await prisma.review.findMany({where:{productId:Number(id)}})
      if(!reviews){
        reply.status(404).send({message:"no reviews yet"})
      }
      const count=reviews.length
      reply.status(200).send({count})
    } catch (error) {
        reply.status(500).send({message:"internal server error"})
   
    }
 
  };
  module.exports =  getProduct ;