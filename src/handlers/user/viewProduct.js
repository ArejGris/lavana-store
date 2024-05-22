const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const viewProduct = async ( req, reply) => {
    const { id } = req.params;
    const {userId}=req.body
    try {
      const product=  await prisma.review.create({data:{productId:Number(id),userId}})
      reply.status(200).send({message:"succesfully view the product",product})
    } catch (error) {
        reply.status(500).send({message:"internal server error"})
   
    }
 
  };
  module.exports =  viewProduct ;