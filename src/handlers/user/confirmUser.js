const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const confirmUser = async (req, reply) => {
  const { userId, phone } = req.body;
  try {
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
