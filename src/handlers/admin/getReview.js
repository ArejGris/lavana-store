const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const getReview = async ( req, reply) => {
    const { id } = req.params;
    try {
      const reviews=  await prisma.review.findMany({where:{productId:Number(id)}})
      if(!reviews){
        reply.status(404).send({message:"no reviews yet"})
      }
     
      reply.status(200).send({reviews})
    } catch (error) {
        reply.status(500).send({message:"internal server error"})
   
    }
 
  };
  module.exports =  getReview ;