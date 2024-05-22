const getAdminsSchema=require("../schemas/admin");
const getAdminHandler=require("../handlers/admin/admin")
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

const getAdminsOpts = {
    schema: getAdminsSchema,
    handler: getAdminHandler,
  };
const adminRoute=(fastify,option,done)=>{
   
      fastify.post('/admin', getAdminsOpts.schema,getAdminsOpts.handler);
      fastify.post('/admin/add-category',addCartegory);
      fastify.post('/admin/add-product', productSchema,addProduct);
      fastify.post('/admin/update-product/:id', productSchema,updateProduct);
      fastify.delete('/admin/add-product/:id', deleteProduct);
      fastify.get('/admin/get-products',getProducts);
      fastify.get('/admin/get-product/:id',getProduct);
      fastify.get('/admin/get-categorys',getCategorys);
      fastify.get('/admin/get-category/:id',getCategory);
      done()
}
module.exports=adminRoute