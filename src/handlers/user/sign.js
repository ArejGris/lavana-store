const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const signhandler = async (fastify, req, reply) => {
  const {
    firstname,
    lastname,
    phoneNumber,
    location,
    city,
    towen,
    gender,
    birthDate,
    password,
    email,
  } = req.body;
  try {
  let user

   user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });


  if (user) {
    reply.send({ message: "already found the email" });
    return;
  }

  const myuser = await prisma.user.create({
    data: {
      firstName:firstname,
      lastName:lastname,
      phoneNumber,
      confirmNumber:false,
      location,
      city,
      towen,
      gender,
      dateOfBirth:birthDate,
      password,
      email,
    },
  });
 if(!myuser){
  reply.send({status:500,message:"internal server error"})
  return;
 }
  console.log(myuser);
  const token = fastify.jwt.sign({ userId: myuser.id });
  if(token){
  console.log(token);
  reply.send({ token: token,user:myuser,status:200});}
  else{
    reply.send({status:403,message:"not allowed"})
  }

 } catch (error) {
  console.log(error)
  reply.send({status:500,message:"internal server error"})
 }

};
module.exports = signhandler;
