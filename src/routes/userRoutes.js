const loginhandler = require("../handlers/user/login");
const signhandler = require("../handlers/user/sign");
const commentProduct = require("../handlers/user/commentProduct");
const makeOrder=require("../handlers/user/makeOrder");
const { loginSchema } = require("../schemas/loginSchema");
const { signSchema } = require("../schemas/signSchema");
const confirmUser = require("../handlers/user/confirmUser");
const signingoogle = require("../handlers/user/signingoogle");
const reviewProduct = require("../handlers/user/reviewProduct");
const getComment = require("../handlers/user/getComment");
const tokenreq = require("../handlers/user/token");
const refreshtoken = require("../handlers/user/refreshtoken");
const getUserOrder = require("../handlers/user/getUserOrders");
const deleteOrder = require("../handlers/user/deleteOrder");
const sendShipment = require("../handlers/user/sendShipment");
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
  fastify.post('/user/shipment-data',sendShipment);
  fastify.post('/user/token',(req,reply)=>tokenreq(fastify,req,reply));
  fastify.post('/user/refresh-token',refreshtoken);
  fastify.post('/user/review-product/:id',reviewProduct);
  fastify.put('/user/confirm',confirmUser);
  fastify.post('/user/comment-product/:id',commentProduct);
  fastify.get('/user/get-comments/:id',getComment);
  fastify.get('/user/get-orders',getUserOrder);
  fastify.delete('/user/delete-order/:id',deleteOrder);
  done();
};
module.exports = userRoute;
