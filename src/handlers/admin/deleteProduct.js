const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const deleteProduct = async (req, reply) => {
    const { id } = req.params;
    try {
      const product=  await prisma.product.delete({where:{id:Number(id)}})
      reply.status(200).send({message:"succesfully deleted the product",product})
    } catch (error) {
        reply.status(500).send({message:"internal server error"})
   
    }
 
  };
  module.exports =  deleteProduct ;