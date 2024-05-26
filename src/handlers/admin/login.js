const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const adminlogin = async(req,reply) => {
    const { email} = req.body;
    console.log(email)
    try { /* 
        const admin2=await prisma.admin.create({data:{email,role:"admin"}})
        console.log(admin2)  */
        const admin= await prisma.admin.findUnique({where:{email:email}})
        if(admin){
      reply.send({admin,status:200})
        }else{
            reply.send({status:400,message:"bad request"})
        }
    } catch (error) {
       console.log(error) 
       reply.send({status:400,message:"bad request"})
    }
  
}
 
module.exports= adminlogin;