const express = require("express");
const userRouter = express.Router();
const {UserModel} = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();

  userRouter.post("/register",async(req,res)=>{
    const{name,email,password,gender}=req.body;

    try{
       const user= await UserModel.findOne({email});
       if(user){
           res.send("User is already exists");
       }else{
           bcrypt.hash(password,5,async(err, hash)=> {
                 if(err){
                      res.send({"err":err.message})
                 }else{
                     const users=new UserModel({name,email,password:hash,gender});
                     await users.save();
                     res.send("Users registered successfully !!");
                 }
           });
       }

    }catch(err){
       res.send({"msg":err.message});
    }
})


module.exports = userRouter;