const express = require('express');
const app = express();
require('dotenv').config()
const {connection} = require("./config/db");
const {router} = require("./routes/user.routes")
const {postRouter} = require("./routes/post.routes")

// Middleware
app.use(express.json());

app.use("/users",router)
app.use("posts",postRouter)

app.listen("8080",async()=>{
    try{
      await connection;
      console.log("Connected to DB")
    }catch(err){
      console.log(err)
      console.log("Cannot connected to DB")
    }
    console.log("server running at 8080")
  });