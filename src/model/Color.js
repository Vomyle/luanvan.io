const mongoose = require("mongoose");
const ColorSchema = new mongoose.Schema({

  Name: {
    type: String,
    required: true,
  },
  
  Product_ItemID:[ {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product_Item",
  }]
});
let Color = mongoose.model("Color", ColorSchema);
module.exports = { Color };
