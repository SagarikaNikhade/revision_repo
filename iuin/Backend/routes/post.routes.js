const express = require("express");
const postRouter = express.Router();
const jwt = require("jsonwebtoken")

const middleware = async(req,res,next)=>{
    const token = req.header("Authtoken")
    if(!token){
        return res.status(401).json({message:"No token provided."})
    }

    try{
       let decoded = jwt.verify(token,process.env.secret)
       req.userId = decoded.userId

       next()
    }
    catch(err){
        res.status(401).json({message:"Authorization denied. Invalid token."})
    }
}

postRouter.post("/add",middleware,async(req,res)=>{
    try{
       let {title,body,device,no_of_comments} = req.body;
       const obj = {
        title,
        body,
        device,
        no_of_comments,
        // author:req.userId
       }
    //    console.log(obj)
    const post = await PostModel.create(obj)
    res.status(200).json({post})
    }
    catch{
        res.status(400).json({message : "Error"})
    }
})

postRouter.get("/",middleware,async(req,res)=>{
    try{
       const {device , page} = req.query;
       let skip
       if(page){
       skip = (page - 1) * 3;
       }else{
       skip = 0;
       }
       let query = { author: req.userId};
       if(device){
        query.device = device;
       }

       const postdata = await PostModel.find(query).skip(skip).limit(3)
       res.status(200).json(postdata)
        }
    catch(err){
        res.status(400).json({message:"Error"})
    }
})

 postRouter.patch("/update",middleware,async(req,res)=>{
    try{
       const post = await PostModel.findById(req.params.id)
        if(!post)
        res.send("post not found")

        if(post.author.toString() !== req.userId)
        res.send("Not authorised")

        const updatePost = await PostModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.status(200).send(updatePost)
    }
    catch(err){
        res.status(400).send({message:"Update-Error"})
    }
})

postRouter.delete("/delete",middleware,async(req,res)=>{
    try{
       const post = await PostModel.findById(req.params.id)
        if(!post)
        res.send("post not found")

        if(post.author.toString() !== req.userId)
        res.send("Not authorised")

        const deletePost = await PostModel.findByIdAndDelete(req.params.id)
        res.status(200).send("post deleted")
    }
    catch(err){
        res.status(400).send({message:"delete-Error"})
    }
})

module.exports = {postRouter};