const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const {UserModel} = require("../models/user.Model")

router.post("/register",async(req,res)=>{
    try{
      const {name,email,gender,password,age,city,is_married} = req.body;
      const user = await UserModel.findOne({email});
      if(user){
          return res.status(200).send({msg:"User already exists , Please login"})
      }
      const hashedPassword = await bcrypt.hash(password,10);
      const newUser = await UserModel.create({name,email,gender,password:hashedPassword,age,city,is_married})
  
      res.status(200).send(newUser)
    }catch(err){
      res.status(400).send({"msg":err.message})
    }
  });


  router.post("/login",async(req,res)=>{
    try{
        const {email,password} = req.body;
        const userPresent = await UserModel.find({email})

        if(!userPresent)
            res.send("User is not present") 
            const check = await bcrypt.compare(password,userPresent[0].password)
            console.log(check)
            if(!check){
                res.send("Invalid credentials")   
            }
            const token = jwt.sign({userId:userPresent[0]._id},process.env.secret)
            res.send({email,token}) 
    }
    catch(err){
        res.status(400).send({"msg":err.message}) 
    }
});

module.exports = {router};