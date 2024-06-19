const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const deleteProduct = async (req, reply) => {
    const { id } = req.params;
    try {
      const product=  await prisma.product.delete({where:{id:Number(id)}})
      reply.send({status:200,message:"succesfully deleted the product",product})
    } catch (error) {
      console.log(error)
        reply.send({status:500,message:"internal server error"})
   
    }
 
  };
  module.exports =  deleteProduct ;