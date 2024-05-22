
const userController=(fastify,options,done)=>{
fastify.get('/',async(req,reply)=>{
    const [users]=await fastify.mysql.execute(`SELECT * FROM users`)
    return{users }
})
    done()
}
module.exports= userController