const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {type : String , required : true},
    email : {type : String  ,required : true , unique : true} ,
    password : {type : String , required : true},
    otp : {type : Number , default : null},
    isVerified : {type : Boolean , default : false},
    token : {type : String , default : null},
    createdAt : {type : String , default : null},
    wishList : {type : [] , default : null , ref : 'books'},
});

const userCollection = new mongoose.model("Users" , userSchema);

module.exports = userCollection;