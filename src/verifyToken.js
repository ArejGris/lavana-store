const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();
const verifyToken = async (req) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1]; // Bearer TOKEN
  console.log(token, "token");
  if (!token) return { status: 400, message: "bad request" }; // If no token, return Unauthorized status
  let user2;
  try {
    user2 = jwt.verify(token, "secretkeyone");
    console.log(user2, "user token");
    const createdAt = new Date(user2.iat * 1000);
    const user = await prisma.user.findUnique({ where: { id: user2.userId } });
    if (user.tokenDate.toISOString() !== createdAt.toISOString()) {
      const sessions = await prisma.session.findMany({
        where: { userId: user2.userId },
      });
      const sessionsdates = sessions.map((session) =>
        session.tokenDate.toISOString()
      );

      if (!sessions || sessionsdates.indexOf(createdAt.toISOString()) === -1) {
        return {
          status: 400,
          message: "date of token not verified",
        };
      }
    }
    return { token };
  } catch (err) {
    if (err && err.message == "jwt expired") {
      //check date of token create

      user2 = jwt.decode(token, "secretkeyone");
      const createdAt = new Date(user2.iat * 1000);
      const user = await prisma.user.findUnique({
        where: { id: user2.userId },
      });
      if (user.tokenDate.toISOString() !== createdAt.toISOString()) {
        const sessions = await prisma.session.findMany({
          where: { userId: user2.userId },
        });

        const sessionsdates = sessions.map((session) =>
          session.tokenDate.toISOString()
        );
        if (sessionsdates.indexOf(createdAt.toISOString()) === -1) {
          return {
            status: 400,
            message: "date of token not verified",
          };
        }
      }
      return { status: 300, message: "send refresh token" };
    }
    if (err) {
      return { status: 403, message: "fail to verify token" };
    }
  }
};
module.exports = verifyToken;
