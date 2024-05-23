const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const getAdminHandler = async (fastify, req, reply) => {
  const { email, password } = req.body;
  const user = await prisma.admin.findUnique({
    where: {
      email: email,
    },
  });
  let token;
  if (user) {
    console.log(user)
    if (admin.password === password) {
      token = fastify.jwt.sign({ userId: email });
      console.log(token);
      reply.send({ token: token });
      return;
    } else {
      reply.send({ msg: "password not valid" });
    }
  } else {
    reply.send({ msg: "user not found please sign in first" });
  }
};
module.exports =  getAdminHandler;