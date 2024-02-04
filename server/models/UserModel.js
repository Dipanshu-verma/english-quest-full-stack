const mongoose = require("mongoose");

const userSchema =  mongoose.Schema({
    email:{type:String,required:true},
    password:{type:String,required:true},
    role:{ type: String, enum: ['CREATOR', 'VIEW_ALL'],  default:"VIEW_ALL" },
})

const UserModel = mongoose.model("newuser", userSchema);

module.exports={UserModel};
