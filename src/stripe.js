
const stripe=require('stripe')('sk_test_51P42i31z0wyoEI2b5alrDS4mQAiPuH5djQESlMZX8cNpHYKA1IxZhR3UBxKLy9ELgJga5gaXmHw2U5MlWqwE87Rf00stSgXryQ')
 async function shipment(items){
   try {
const session=await stripe.checkout.sessions.create({
    payment_method_types:['card'],
    mode:'payment',
    line_items:items.map(item=>{
        
        return{
            price_data:{
                currency:'usd',
                product_data:{name:item.name},
                
                unit_amount:item.price
            },
            quantity:item.quentity
        }
    }),
    mode:'payment',
    success_url:'http://localhost:3000',
    cancel_url:'http://localhost:3000',
    metadata:{
        orderId:'1234'
    }
})
console.log("leehho",session.url) 
if(session.url){
return({status:200,url:session.url})}
else{
    return({status:403})
}
   } catch (error) {
    console.log(error)
    return({status:500,message:error.message})
   }
}
module.exports=shipment