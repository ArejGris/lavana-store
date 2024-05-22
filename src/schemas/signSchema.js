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
        dateOfBirth: { type: 'string' },
        password: { type: 'string' },
        email: { type: 'string' },
      },
      required:['firstname','lastname','phoneNumber','password','email']
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
