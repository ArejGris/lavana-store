const categorySchema = {
    body:{
      type:"object",
      properties:{
        title:{type:'string'}
      }
    },
    response: {
      200: {
          type:"object",
          properties:{
            message:{type:'string'},
           cat:{type:'string'},
          
          }
        }
      
    },
  };
  module.exports =  {categorySchema };