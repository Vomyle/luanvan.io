const mongoose = require("mongoose");
const CommentSchema = new mongoose.Schema({

  Content: {
    type: String,
    required: true,
  },
  Rating: {
    type: Float,
    required: true,
  },
  ProductID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  UserID:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  
});
let Product = mongoose.model("Product", ProductChema);
module.exports = { Product };
