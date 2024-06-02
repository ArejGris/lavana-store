const loginhandler = require("../handlers/user/login");
const signhandler = require("../handlers/user/sign");
const commentProduct = require("../handlers/user/commentProduct");
const makeOrder=require("../handlers/user/makeOrder");
const { loginSchema } = require("../schemas/loginSchema");
const { signSchema } = require("../schemas/signSchema");
const stripeNot = require("../handlers/user/stripeNot");
const confirmUser = require("../handlers/user/confirmUser");
const signingoogle = require("../handlers/user/signingoogle");
const reviewProduct = require("../handlers/user/reviewProduct");
const getComment = require("../handlers/user/getComment");
const userRoute = (fastify, option, done) => {
  fastify.post(
    "/user/sign",
    { signSchema, attachValidation: true },
    (req, reply) => {
      if (req.validationError) {
        reply.send({ message: "all field required" });
      } else {
        signhandler(fastify, req, reply);
      }
    }
  );
  fastify.post('/user/signingoogle',(req,reply)=>signingoogle(fastify,req,reply));
  fastify.post("/user/login", loginSchema, (req, reply) =>
    loginhandler(fastify, req, reply)
  );
 
  fastify.post('/user/make-order',makeOrder);
  fastify.post('/hooks',stripeNot)
  fastify.post('/user/view-product',reviewProduct);
  fastify.put('/user/confirm',confirmUser);
  fastify.post('/user/comment-product/:id',commentProduct);
  fastify.get('/user/get-comments/:id',getComment);
  done();
};
module.exports = userRoute;
