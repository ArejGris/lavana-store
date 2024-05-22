const loginSchema = {
    
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
             token:{type:'string'},
             user:{type:'object'}
            }
          }
        
      },
  };
  module.exports =  { loginSchema };