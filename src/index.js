
const fastify1=require('fastify')({logger:true})

// plug in
//fastify1.register(require('./stripeController'),{prefix:'/stripe'})
fastify1.register(require('./routes/adminRoutes'))
fastify1.register(require('./routes/userRoutes'))
/* const rawBody=require('raw-body')
fastify1.addContentTypeParser('application/json',{parseAs:'string'},(req,done)=>{
    rawBody(req,{length:req.headers['content-length'],limit:'1mb'},(err,body)=>{
        if(err) return done(err)
        done(null,JSON.parse(body))
    })
}) */
 /*
//hooks
fastify1.addHook('preHandler',(req,reply,done)=>{
    req.user={name:'john Doe'};
    done();
}) */

 
/* 
fastify1.get('/',(req,reply)=>{
    return{
        message:`Hello,${req.user.name}`
    }
})
fastify1.get('/protected', {
    onRequest:fastify1.authenticate
  },async(req,reply)=>{
    return  req.user
}) */
//database

/*  fastify1.register(require('@fastify/mysql'),{
    host:'localhost',
    user:'root',
    port:3306,
    password1:'1234',
    database:'users',
    promise:true
})  */
/* fastify1.register(require('fastify-supabase'),{
    supabaseKey:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkcW1keGhvYmV4Zmd1bWF3aW5rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYzODYzNDUsImV4cCI6MjAzMTk2MjM0NX0.3XxfA80dr5zMEqJDKJEbNknBs9gNhGSEpxNgW4vbtFw',
    supabaseUrl:'https://bdqmdxhobexfgumawink.supabase.co'
}) */
fastify1.register(require('@fastify/postgres'),{
    connectionString:'postgres://postgres.bdqmdxhobexfgumawink:Lavana1299gris@@@aws-0-eu-central-1.pooler.supabase.com:5432/postgres'
})
//prisma

/* const {PrismaClient}=require('@prisma/client')
const prisma=new PrismaClient()
fastify1.get('/users',async(req,reply)=>{
    
    const users=await prisma.users.create({
        data:{
            id:9,
            namel:"arej",
            age:99,
            city:"hama"

        }
    })
   reply.send(users)
}) */

 fastify1.register(require("@fastify/cors"),{
    origin:'*'
})  
// another methods for route
/* fastify1.route({
    method:"POST",
    url:"/register2",
    handler:(req,reply)=>{
       const {username,email,password}=JSON.parse(req.body)
        
           console.log(`hello ${email} ${password} ${username}`)
       
    }
})
 */

try {
    fastify1.listen(3000,'0.0.0.0',err=>{
        if(err)
            throw err;
    })
} catch (error) {
    fastify1.log.error(error)
    process.exit(1)
}
 