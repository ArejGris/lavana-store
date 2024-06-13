const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const AddCopon=async(req,reply)=>{
const {number,discount}=req.body
const copons=[]
for(let i=0;i<number;i++){
   let code =generateCode()

    const date=new Date()
    copons.push({
        code,date,discount
    })
   const cop= await prisma.copon.findUnique({where:{code:code}})
   if(cop){
    code=generateCode()
   }
await prisma.copon.create({
    data:{
        code:code,
        discount:Number(discount),
        date:date
    }
})
}
reply.send({status:200,copons})
}
module.exports=AddCopon
function generateCode(){
    const characters='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let code=''
    for(let i=0;i<4;i++){
        const randonIndex=Math.floor(Math.random()*characters.length)
        code+=characters[randonIndex]
    }
    return code
}