const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();
const verifyToken=async(req)=>{

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
        console.log("hello world");
        const session = await prisma.session.findUnique({
          where: { userId: user2.userId },
        });
        console.log(session.tokenDate, "tokenDate");
        console.log(createdAt, "created at");
        if (
          !session ||
          session.tokenDate.toISOString() !== createdAt.toISOString()
        ) {
          return {
            status: 400,
            message: "date of token not verified",
          };
        }
      }
      return {token}
    } catch (err) {
      if (err && err.message == "jwt expired") {
        //check date of token create
  
        user2 = jwt.decode(token, "secretkeyone");
        console.log(user2, "user token");
        const createdAt = new Date(user2.iat * 1000);
        console.log(createdAt, "createedAt");
        const user = await prisma.user.findUnique({
          where: { id: user2.userId },
        });
        console.log(user.tokenDate, "token date");
        if (user.tokenDate.toISOString() !== createdAt.toISOString()) {
          console.log("the token isn'nt compitable with the date stored in db")
          const session = await prisma.session.findUnique({
            where: { userId: user2.userId },
          });
          if (session.tokenDate.toISOString() !== createdAt.toISOString()) {
            console.log("hello");
            return {
              status: 400,
              message: "date of token not verified",
            };
          }else{
            console.log("the token compitable with the date stored in db")
          }
        }
        return { status: 300, message: "send refresh token" };
      }
      if (err) {
        return { status: 403, message: "fail to verify token" };
      }
    }
}
module.exports=verifyToken