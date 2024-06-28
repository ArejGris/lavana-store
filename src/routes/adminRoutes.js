const getAdminsSchema=require("../schemas/admin");
//const getAdminHandler=require("../handlers/admin/admin")
const addCartegory=require("../handlers/admin/addCatigory")
const addProduct =require("../handlers/admin/addProduct")
const updateProduct=require("../handlers/admin/updateProduct")
const deleteProduct=require("../handlers/admin/deleteProduct")
const getProduct=require("../handlers/admin/getProduct")
const getProducts=require("../handlers/admin/getProducts")
const {cartegorySchema}=require("../schemas/category")
const {productSchema}=require("../schemas/product");
const getCategorys = require("../handlers/admin/getCategorys");
const getCategory = require("../handlers/admin/getCategory");
const adminlogin = require("../handlers/admin/login");
const commentProduct = require("../handlers/admin/commentProduct");
const getReview = require("../handlers/admin/getReview");
const getOrderProducts = require("../handlers/admin/getOrderProducts");
const tokenverify = require("../handlers/admin/token");
const refreshtoken = require("../handlers/admin/refreshToken");
const AddCopon = require("../handlers/admin/addCopon");
const deleteCategory = require("../handlers/admin/deleteCategory");

const adminRoute=(fastify,option,done)=>{
   
      //fastify.post('/admin', getAdminsOpts.schema,getAdminsOpts.handler);
      fastify.post('/admin/add-category',addCartegory);
      fastify.post('/admin/add-product', productSchema,addProduct);
      fastify.post('/admin/get-order-products',getOrderProducts);
      fastify.post('/admin/comment-product/:id',commentProduct);
      fastify.post('/admin/update-product/:id', productSchema,updateProduct);
      fastify.delete('/admin/delete-product/:id', deleteProduct);
      fastify.get('/admin/get-products',getProducts);
      fastify.get('/admin/get-product/:id',getProduct);
      fastify.get('/admin/get-categorys',getCategorys);
      fastify.delete('/admin/delete-category/:id',deleteCategory)
      fastify.get('/admin/get-category/:id',getCategory);
      fastify.get('/admin/get-review/:id',getReview)
      fastify.post('/admin/sign-in',(req,reply)=>adminlogin(fastify,req,reply))
      fastify.post('/admin/refresh-token',refreshtoken)
      fastify.post('/admin/add-copon',AddCopon)
      fastify.post("/admin/token", (req, reply) =>
        tokenverify(fastify, req, reply)
      );
      done()
}
module.exports=adminRoute