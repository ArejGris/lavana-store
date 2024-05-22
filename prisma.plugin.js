
const {PrismaClient}=require('@prisma/client')
const prisma=new PrismaClient()
async function register(fastify,options){
    try {
        await prisma.$connect()
        fastify.decorate('prisma',prisma)
    } catch (error) {
        console.log(error)
    }
}
module.exports= register