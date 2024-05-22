const orderSchema = {
    body: {
      type: 'object',
          properties: {
            userId: {type:'string'},
            orderDate: {type:'date'},
          },
    },
  };
  module.exports =  {orderSchema };