const mongoose = require("mongoose");
const CategoriesSchema = new mongoose.Schema({

  Name: {
    type: String,
    required: true,
  },
  
  Product_ItemID:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product_Item",
    }
  ] 
});
let Categories = mongoose.model("Categories", CategoriesSchema);
module.exports = { Categories };
