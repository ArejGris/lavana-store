const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const addProduct= async ( req, reply) => {
  const {
    categories,
    price,
    size,
    description,
    keyWord,
    images
  } = req.body;
  if (!price || !keyWord || !description||!size) {
    reply.send({ message: "must be complete information" });
    return;
  }
 let imgStr=''
 images.forEach(img=>{
  imgStr+=img+" "
 })
  try {
    const product=await prisma.product.create({
     data:{ price,
      size,
      description,
      keyWord,
      images:imgStr}
    });
    if(categories.length>0){
      categories.forEach(async(cat)=> {
     await prisma.productCategory.create({
      data:{ cartegoryId:cat,
       productId:product.id}
      })}
    );
  }
    reply.status(200).send({message:"successfully added the product",product})
  } catch (error) {
    console.log(error)
    reply.status(500).send({message:"intrnal server error"})
  }
 
};
module.exports = addProduct;
