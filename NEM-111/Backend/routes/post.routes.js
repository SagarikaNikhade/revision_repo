const { Router } = require("express");
const { PostModel } = require("../models/post.model");

const postRouter = Router();

postRouter.get("/", async (req, res) => {
    res.send("post karo bhaisahab")
})

postRouter.post("/add", async (req, res) => {
    try {
        const {title,body,device} = req.body;
        //    console.log(payload);
        const obj={
            title,body,device
        }
        const newPost = await PostModel.create(obj)
        // await newPost.save()
        res.json({ msg: "New post has been added"})
        //    console.log(newPost)
    }
    catch (err) {
        res.status(400).send({ message: err.message })
    }
})

module.exports = { postRouter }