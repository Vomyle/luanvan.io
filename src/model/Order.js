const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    
      Total: {
        type: String,
        required: true,
      },
      Email: {
        type: String,
        required: true,
      },
      Phone: {
        type: String,
        required: true,
      },
      Address: {
        type: String,
        required: true,
      },
      Fullname: {
        type: String,
        required: true,
      },
      StatusPayment: {
        type: String,
        required: true,
      }, 
      Status: {
        type: String,
        required: true,
      },
      UserID: 
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        }
      
    });
let Order = mongoose.model("Order", OrderSchema);
module.exports =  Order 
