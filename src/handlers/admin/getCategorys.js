const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const getCategorys = async ( req, reply) => {
  
    try {
      const categorys=  await prisma.category.findMany({})
      if(!categorys){
        reply.status(404).send({message:" no categories found"})
      }
      reply.status(200).send({categorys})
    } catch (error) {
        reply.status(500).send({message:"internal server error"})
   
    }
 
  };
  module.exports =  getCategorys ;