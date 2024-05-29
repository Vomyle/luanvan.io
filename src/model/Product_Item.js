const mongoose = require("mongoose");
const Product_ItemSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  UnitlnStock: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    required: true,
  },
  ProductID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  ColorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Color",
  }
});
let Product_Item = mongoose.model("Product_Item", Product_ItemSchema);
module.exports = { Product_Item };
