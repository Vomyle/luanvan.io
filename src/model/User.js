const  mongoose = require("mongoose");
const UserSchema= new mongoose.Schema({
    Name:{
        type:String,
        required:true
    }, Email:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    IsAdmin:{
        type:Boolean,
        default:false,
        required:true
    }
})
let User=mongoose.model("User",UserSchema);
module.exports = User
