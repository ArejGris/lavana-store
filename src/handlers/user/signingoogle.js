const { PrismaClient } = require("@prisma/client");
const { generateAccessToken } = require("../../auth2");
const jwt=require('jsonwebtoken')
const prisma = new PrismaClient();
const signingoogle = async (fastify,req, reply) => {
  const {
    email,
    firstName,lastName
  } = req.body;
  try {
  let user
   user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (user) {
    
  const token=generateAccessToken(user.id)
  const decode = jwt.decode(token);
  const date = new Date(decode.iat * 1000);
  await prisma.user.update({where:{id:user.id},data:{tokenDate:date}})
  await prisma.session.create({
    data:{customer:{connect:{id:user.id}}, tokenDate: date}
   })
    reply.send({ status:200,user,token,message: "already found the email" });
    return;
  }

  const myuser = await prisma.user.create({
    data: {
      email,firstName,lastName
    },
  });

  const token=generateAccessToken(myuser.id)
  const decode = jwt.decode(token);
  const date = new Date(decode.iat * 1000);
  await prisma.session.create({
    data:{customer:{connect:{id:myuser.id}}, tokenDate: date }
   })
  
 if(!myuser){
  reply.send({status:500,message:"user havent created"})
  return;
 }
  console.log(myuser);
 return reply.send({user:myuser,token,status:200});
 } catch (error) {
  console.log(error)
  return reply.send({status:500,message:"internal server error"})
 }

};
module.exports = signingoogle;
