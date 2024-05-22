const loginhandler = require("../handlers/user/login");
const signhandler = require("../handlers/user/sign");
const viewProduct = require("../handlers/user/viewProduct");
const commentProduct = require("../handlers/user/commentProduct");
const makeOrder=require("../handlers/user/makeOrder");

const { loginSchema } = require("../schemas/loginSchema");
const { signSchema } = require("../schemas/signSchema");
const registerOrder = require("../handlers/user/registerOrder");
const stripeNot = require("../handlers/user/stripeNot");
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
  fastify.post('/user/register-order',registerOrder);
  fastify.post('/hooks',stripeNot)
  fastify.post('/user/view-product',viewProduct);
  fastify.post('/user/comment-product',commentProduct);
  done();
};
module.exports = signRoute;
