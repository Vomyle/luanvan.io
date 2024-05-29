const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Description: { 
    type: String
  },
  Price: {
    type: Number,
    required: true,
  },
  CategoryID: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  Product_PromotionID: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product_Promotion",
  }]
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = { Product };
