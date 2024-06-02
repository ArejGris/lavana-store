const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const getOrderProducts = async ( req, reply) => {
  const {items}=req.body
    try {
      const products=  await prisma.product.findMany({where:{
        id:{
            in:items
        }
      }})
      
      reply.send({status:200,products:products})
    } catch (error) {
        reply.status(500).send({message:"internal server error"})
   
    }
 
  };
  module.exports =  getOrderProducts ;