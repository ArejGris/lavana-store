const stripe=require('stripe')('sk_test_51P42i31z0wyoEI2b5alrDS4mQAiPuH5djQESlMZX8cNpHYKA1IxZhR3UBxKLy9ELgJga5gaXmHw2U5MlWqwE87Rf00stSgXryQ')
const STRIPE_WEB_KEY='whsec_9bc5b39c8f8210707505a9cb4a2e6f1b9a1f7b36c995d2a26941f1e047833408'
const stripeNot=async(request,reply)=>{
   
let event
try {
    console.log("hello")
    event=stripe.webhooks.contructEvent(request.body,request.headers['stripe-signature'],STRIPE_WEB_KEY)
} catch (error) {
    console.log(`webhook signature verification failed`)
    reply.status(400).send({message:'invalid webhook signature'})
}
switch (event.type){
    case 'payment_intent.succeeded':
    const paymentIntent=event.data.object
    console.log(paymentIntent,"hello world")
    break;
    default:
        console.log('unhandled event type',event.type)

}
console.log(event.data.object,"jjjj")
const session=event.data.object;
const orderId=session.metadata.orderId
reply.send({recieved:true})
}
module.exports=stripeNot