const loginhandler = require("../handlers/user/login");
const signhandler = require("../handlers/user/sign");
const viewProduct = require("../handlers/user/viewProduct");
const commentProduct = require("../handlers/user/commentProduct");
const makeOrder=require("../handlers/user/makeOrder");

const { loginSchema } = require("../schemas/loginSchema");
const { signSchema } = require("../schemas/signSchema");
const stripeNot = require("../handlers/user/stripeNot");
const confirmUser = require("../handlers/user/confirmUser");
const signRoute = (fastify, option, done) => {
  fastify.post(
    "/sign",
    { signSchema, attachValidation: true },
    (req, reply) => {
      if (req.validationError) {
        reply.send({ message: "all field required" });
      } else {
        signhandler(fastify, req, reply);
      }
    }
  );
  fastify.post("/login", loginSchema, (req, reply) =>
    loginhandler(fastify, req, reply)
  );
  
  fastify.post('/user/make-order',makeOrder);
  fastify.post('/hooks',stripeNot)
  fastify.post('/user/view-product',viewProduct);
  fastify.put('/user/confirm',confirmUser);
  fastify.post('/user/comment-product/:id',commentProduct);
  done();
};
module.exports = signRoute;
