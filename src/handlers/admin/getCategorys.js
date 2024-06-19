const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const getCategorys = async ( req, reply) => {
  
    try {
      const categorys=  await prisma.category.findMany({})
      console.log(categorys)
      if(!categorys){
        reply.status(404).send({message:" no categories found"})
      }
    const  promises=categorys.map(async(cat)=>{
        const productesNum=await prisma.productCategory.count({where:{categoryId:cat.id}})
       return{
        ...cat,number:productesNum
       }
      })
      const categories=await Promise.all(promises)
      reply.send({status:200,categories})
    } catch (error) {
        reply.status(500).send({message:"internal server error"})
   
    }
 
  };
  module.exports =  getCategorys ;