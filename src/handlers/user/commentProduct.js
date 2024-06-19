const { PrismaClient } = require("@prisma/client");
const verifyToken = require("../../verifyToken");
const jwt=require('jsonwebtoken')
const prisma = new PrismaClient();
const commentProduct = async ( req, reply) => {
  const { id } = req.params;
  const { comment } = req.body;
  const res=await verifyToken(req)
  if(!res.token){
    return reply.send(res);
  }
  const token=res.token
  try {
    
  const  user2 = jwt.decode(token, "secretkeyone");
  const userId=user2.userId
    const product = await prisma.product.findUnique({ where:{id:Number(id)} });
    const user = await prisma.user.findUnique({ where:{id: userId} });
   

    if (!product||!user) {
      reply.send({ status: 404, message: "product not found" });
    } else {
      const username=user.firstName+" "+user.lastName
      console.log(username,comment)
      const thecomment = await prisma.comment.create({data:{
        customer: username,
        content: comment
      }});
      await prisma.commentUser.create({data:{
        customer: {connect:{id:userId}},
        comment: {connect:{id:thecomment.id}},
        product: {connect:{id:product.id}},
      }});
    }
    reply.send({ status: 200, message: "your comment added successfully" });
  } catch (error) {
    console.log(error)
    reply.status(500).send({ message: "internal server error" });
  }
};
module.exports = commentProduct;
