const mongoose = require("mongoose");
const ImageSchema = new mongoose.Schema({

Url: {
    type: String,
    required: true,
  },
  
  ProductID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  }
});
let Image = mongoose.model("Image", ImageSchema);
module.exports = { Image };
