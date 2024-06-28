const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const getReview = async ( req, reply) => {
    const { id } = req.params;
    try {
      const reviews=  await prisma.review.findMany({where:{productId:Number(id)}})
      if(!reviews){
        reply.status(404).send({message:"no reviews yet"})
      }
const array=[1,2,3,4,5]
const productreview=await prisma.review.count({where:{productId:Number(id)}})
const promises=array.map(async(val)=>{
  
  const reviews=await prisma.review.count({where:{productId:Number(id),val}})
  
  return {
   val,reviews
  }
}) 
const allreviews=await Promise.all(promises)
let max=0
if(productreview>0){
 const top=allreviews.reduce((prev,current)=>((prev.reviews>current.reviews)?prev:current),allreviews[0])
 max=top.val
}
      reply.status(200).send({max:max,stars:allreviews,review:productreview})
    } catch (error) {
      console.log(error,"error")
        reply.status(500).send({message:"internal server error"})
   
    }
 
  };
  module.exports =  getReview ;