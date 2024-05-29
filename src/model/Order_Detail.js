const mongoose = require("mongoose");
const Order_DetailSchema = new mongoose.Schema({
 
  Quatity: {
    type: Interger,
    required: true,
  },
  Product_ItemID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  OrderID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  },
});
let Order_Detail = mongoose.model("Order_Detail", Order_DetailSchema);
module.exports = { ProdOrder_Detailuct };
