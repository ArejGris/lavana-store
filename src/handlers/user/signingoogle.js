const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const signingoogle = async (req, reply) => {
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
    reply.send({ status:200,user,message: "already found the email" });
    return;
  }

  const myuser = await prisma.user.create({
    data: {
      email,firstName,lastName
    },
  });
 if(!myuser){
  reply.send({status:500,message:"user havent created"})
  return;
 }
  console.log(myuser);
  
  reply.send({user:myuser,status:200});
 } catch (error) {
  console.log(error)
  reply.send({status:500,message:"internal server error"})
 }

};
module.exports = signingoogle;
