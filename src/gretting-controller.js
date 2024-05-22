const responseSchema={
    response:{
        200:{
            properties:{
                message:{type:'string'}
            }
        }
    }
}
const grettingController=(fastify,option,done)=>{
    fastify.get('/',responseSchema,(req,reply)=>{
        return {
            message :"hello world"
        }
    }) 
    fastify.get('/:name',(req,reply)=>{
        return {
            message :`hello ${req.params.name}`
        }
    }) 
done()
}
module.exports= grettingController;