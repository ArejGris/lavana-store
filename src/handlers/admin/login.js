const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt=require('jsonwebtoken')
const { generateAdminToken} = require("../../auth2");
const adminlogin = async(fastify,req,reply) => {
    const { email} = req.body;
    console.log(email)
    try {   /* 
        const admin2=await prisma.admin.create({data:{email,role:"admin"}})
        console.log(admin2) */
        const admin= await prisma.admin.findUnique({where:{email:email}})
        if(admin){
      const  token = generateAdminToken(admin.id)
       
      const decode = jwt.decode(token);
      const createdAt = new Date(decode.iat * 1000);
      await prisma.admin.update({
        where: { id: admin.id },
        data: { tokenDate: createdAt },
      });

  await prisma.adminSession.create({
    data:{admin:{connect:{id:admin.id}}, tokenDate: createdAt }
   })
  
     return reply.send({admin,token,status:200})
        }else{
          return  reply.send({status:400,message:"bad request"})
        }
    } catch (error) {
       console.log(error) 
      return reply.send({status:400,message:"bad request"})
    }
  
}
 
module.exports= adminlogin;