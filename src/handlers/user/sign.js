const { PrismaClient } = require("@prisma/client");
const { generateAccessToken } = require("../../auth2");
const jwt=require('jsonwebtoken')
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
    let user;

    user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      reply.send({ message: "already found the email" });
      return;
    }
    const checkphone = await prisma.user.findUnique({
      where: { phoneNumber: phoneNumber },
    });
    if (checkphone) {
      reply.send({ message: "phone number is already used", status: 400 });
    } else {
      const myuser = await prisma.user.create({
        data: {
          firstName: firstname,
          lastName: lastname,
          phoneNumber,
          confirmNumber: false,
          location,
          city,
          towen,
          gender,
          dateOfBirth: birthDate,
          password,
          email,
        },
      });
      if (!myuser) {
        reply.send({ status: 500, message: "user havent created" });
        return;
      } else {
        
     const token = generateAccessToken( myuser.id );
     const decode = jwt.decode(token);
     const date = new Date(decode.iat * 1000);
     await prisma.user.update({
       where: { id: myuser.id },
       data: { tokenDate: date },
     });
     await prisma.session.create({data:{customer:{connect:{id:myuser.id}},
      tokenDate:date
     }})
        reply.send({ user: myuser,token, status: 200 });
      }
    }
  } catch (error) {
    console.log(error);
    reply.send({ status: 500, message: "internal server error" });
  }
};
module.exports = signhandler;
