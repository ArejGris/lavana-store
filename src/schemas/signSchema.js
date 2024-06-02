const signSchema = {
  body:{
      type: "object",
      properties: {
        firstname: { type: 'string '},
        lastname: { type: 'string' },
        phoneNumber: { type: 'string' },
        location: { type: 'string' },
        city: { type: 'string' },
        tower: { type: 'string' },
        paymentDetails: { type: 'string' },
        gender: { type: 'string' },
        dateOfBirth: { type: 'date' },
        password: { type: 'string' },
        email: { type: 'string' },
      },
      required:['email']
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
module.exports = { signSchema };
