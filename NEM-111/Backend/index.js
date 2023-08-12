const express = require("express");
const {connection} = require("./config/db")
const {postRouter} = require("./routes/post.routes")
const {userRouter} = require("./routes/user.routes")
const { auth } = require("./middleware/auth.middleware");
require("dotenv").config();

const app = express();
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Post App")
})

app.use("/user",userRouter)
app.use("/posts",auth,postRouter)

app.listen(8070 , async()=>{
    try{
      await connection
      console.log("connect to DB")
    }
    catch(err){
        console.log()
    }
    console.log("server running @ 8070")
})