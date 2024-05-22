const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const loginhandler = async (fastify, req, reply) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  let token;
  if (user) {
    console.log(user)
    if (user.password === password) {
      token = fastify.jwt.sign({ userId: email });

      console.log(token);
      reply.send({ token: token ,user});
      return;
    } else {
      reply.send({ msg: "password not valid" });
    }
  } else {
    reply.send({ msg: "user not found please sign in first" });
  }
};
module.exports = loginhandler;
