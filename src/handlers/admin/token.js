const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();
const tokenverify = async (fastify, req, reply) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN
  try {
    jwt.verify(token, "secretkeyadmin");
  } catch (error) {
    return reply.send({ status: 403, message: "admin not verfied" });
  }
  const data = jwt.decode(token, "secretkeyadmin");
  const createdAt = new Date(data.iat * 1000);
  console.log(data);
  const admin = await prisma.admin.findUnique({ where: { id: data.userId } });

  if (admin) {
    if (createdAt.toISOString() === admin.tokenDate.toISOString()) {
      return reply.send({ status: 200, message: "admin verfied" });
    } else {
      const sessions = await prisma.adminSession.findMany({
        where: { adminId: admin.id },
      });
      const thesessions = sessions.map((session) =>
        session.tokenDate.toISOString()
      );
      console.log(thesessions)
      if (thesessions.indexOf(createdAt.toISOString())!==-1) {
        return reply.send({ status: 200, message: "admin verfied with session history" });
      }
      
    return reply.send({ status: 401, message: "admin not verfied" });
    }
  } else {
    return reply.send({ status: 401, message: "admin not verfied" });
  }
};
module.exports = tokenverify;
