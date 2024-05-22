
const getAdminsSchema = {
  body: {
    type: 'object',
    properties: {
      email: {type:'string'},
      password:{type:'string'}
    },
    required:['email','password']
},
response: {
  200: {
      type:"object",
      properties:{
       token:{type:'string'}
      }
    }
  
},
};
  module.exports =  {getAdminsSchema };