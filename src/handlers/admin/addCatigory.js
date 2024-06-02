const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const addCategory = async ( req, reply) => {
    const { title,title2 } = req.body;
    console.log(title)
    try {
      
 const cat= await prisma.category.create({data:{title,title2}})
 reply.status(200).send({message:"successfully added the category",cat})
    } catch (error) {
      console.log(error)
 reply.status(500).send({message:"interal server error"})
    }
  };
  module.exports =  addCategory ;