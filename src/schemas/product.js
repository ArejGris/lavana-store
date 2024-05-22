const productSchema = {
  body: { 
     type: "object",
  properties: {
    categories: { type: "array" },
    price: { type: "number" },
    size: { type: "string" },
    description: { type: "string" },
    keyWord: { type: "string" },
    image1: { type: "array" }
  },
  required:['price']
}
};
module.exports = { productSchema };
