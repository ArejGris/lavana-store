const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();
const confirmUser = async (req, reply) => {
  const { phone } = req.body;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN
 
  try {
    const user2=jwt.decode(token)
   const userId=user2.userId
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user.email) {
      await prisma.user.update({
        where: { id: userId },
        data: { confirmNumber: true },
      });
    } else {
        await prisma.user.update({
            where: { id: userId },
            data: { confirmNumber: true ,phoneNumber:phone},
          });
    }
    reply.send({ status: 200, message: "user confirmed" });
  } catch (error) {
    reply.send({ status: 200, message: "internal server error" });
  }
};
module.exports = confirmUser;
