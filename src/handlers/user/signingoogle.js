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
    reply.send({ status:200,user,token,message: "already found the email" });
    return;
  }

  const myuser = await prisma.user.create({
    data: {
      email,firstName,lastName
    },
  });
const session= await prisma.session.findUnique({where:{userId:myuser.id}})
if(session){
  await prisma.session.update({
    where:{userId:myuser.id},data:{ tokenDate: createdAt }
   })
  }else{
    
  await prisma.session.create({
    data:{customer:{connect:{id:myuser.id}}, tokenDate: createdAt }
   })
  }
 if(!myuser){
  reply.send({status:500,message:"user havent created"})
  return;
 }
  console.log(myuser);
  const token=await fastify.jwt.sign({userId:myuser.id})
  await prisma.user.update({where:{id:myuser.id},data:{lastSignin:new Date()}})
  const refreshToken=randtoken.uid(190)
  reply.send({user:myuser,refreshToken,token,status:200});
 } catch (error) {
  console.log(error)
  reply.send({status:500,message:"internal server error"})
 }

};
module.exports = signingoogle;
