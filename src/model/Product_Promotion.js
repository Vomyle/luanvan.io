const mongoose = require("mongoose");

const Product_PromotionSchema = new mongoose.Schema({
  Price: {
    type: Number,
    required: true,
  },
  Name: {
    type: String,
    require: true,
  },
  EndDate: {
    type: Date,
  },
  StartDate: {
    type: Date,
  },
});
let Product_Promotion = mongoose.model(
  "Product_Promotion",
  Product_PromotionSchema
);
module.exports = Product_Promotion ;
