const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const deleteCategory = async (req, reply) => {
    const { id } = req.params;
    try {
      const cat=  await prisma.category.delete({where:{id:Number(id)}})
      reply.send({status:200,message:"succesfully deleted the category",cat})
    } catch (error) {
      console.log(error)
        reply.send({status:500,message:"internal server error"})
   
    }
 
  };
  module.exports =  deleteCategory ;