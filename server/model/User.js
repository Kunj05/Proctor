const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        trim:true,
    },
    lastname:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    accountType:{
        type:String,
        enum:["Teacher","Admin","Student"],
        required:true,
    },
    token:{
        type:String,
    },
    resetPasswordExpires:{
        type:Date,
    },
    
});

module.exports = mongoose.model("User",userSchema);