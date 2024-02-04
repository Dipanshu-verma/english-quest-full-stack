const express  = require("express");
 const {UserModel} = require("../models/UserModel.js")
 
const jwt = require("jsonwebtoken");
require("dotenv").config();

const AuthRoute =  express.Router();
 
AuthRoute.post("/signup", async(req, res) => {
    const { email, password} = req.body;
  
    
    try {
      const existuser = await UserModel.findOne({ email });
   
      if (existuser) {
        return res.status(401).json({ error: "User Already Exist" });
      }

       let newuser = {email, password}

       if(email.includes("creator")){
        newuser.role = "CREATOR"
        
       }
    
       const user = new UserModel(newuser);
      await user.save();  
      res.status(200).json({ message: "Singup Successfull"});
    } catch (error) {
      res.status(500).json({ error: "error signup" });
    }
  });


AuthRoute.post("/login",  async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const existuser = await UserModel.findOne({ email });
      if (!existuser) {
        return res
          .status(401)
          .json({ error: "User is not exist please signup first" });
      }
  
      
      if (password !== existuser.password) {
        return res.status(401).json({ error: "invalid credentials" });
      }
  
      const token = await jwt.sign(
        { user: existuser },
        process.env.JWT_SECRET,
         
      );
  
    res.status(200).json({user:existuser,token,message:"Login successfull"})
  
    } catch (error) {
      console.log(`error: ${error}`);
    }
  });


module.exports = {AuthRoute}
