const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const signhandler = async (fastify, req, reply) => {
  const {
    firstname,
    lastname,
    phoneNumber,
    location,
    city,
    tower,
    gender,
    birthDate,
    password,
    email,
  } = req.body;
  let user
 try {
   user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
 } catch (error) {
 return reply.send({status:400,message:"bad request"})
 }

  if (user) {
    reply.send({ message: "already found the email" });
    return;
  }
 try {
  const myuser = await prisma.user.create({
    data: {
      firstName:firstname,
      lastName:lastname,
      phoneNumber,
      location,
      city,
      tower,
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
  const token = fastify.jwt.sign({ userId: email });
  if(token){
  console.log(token);
  reply.send({ token: token,user:myuser});}
  else{
    reply.send({status:403,message:"not allowed"})
  }

 } catch (error) {
  console.log(error)
  reply.send({status:500,message:"internal server error"})
 }

};
module.exports = signhandler;
