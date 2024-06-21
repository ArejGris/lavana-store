const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const { generateAccessToken, generateRefreshToken } = require("../../auth2");

const prisma = new PrismaClient();
const loginhandler = async (fastify, req, reply) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (user) {
    console.log(user);
    if (user.password === password) {
      const token = generateAccessToken(user.id);

      const decode = jwt.decode(token);
      const createdAt = new Date(decode.iat * 1000);
      await prisma.user.update({
        where: { id: user.id },
        data: { tokenDate: createdAt },
      });
      try {
    
          await prisma.session.create({
            data: { customer:{connect:{id: user.id}}, tokenDate: createdAt },
          });
        
        return reply.send({ user, token, status: 200 });
      } catch (error) {
        console.log(error);

        reply.send({ status: 500, msg: "internal server error" });
      }
    } else {
      reply.send({ status: 500, msg: "password not valid" });
    }
  } else {
    reply.send({ status: 500, msg: "user not found please sign in first" });
  }
};
module.exports = loginhandler;
