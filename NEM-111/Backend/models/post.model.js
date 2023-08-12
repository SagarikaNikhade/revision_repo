const mongoose = require("mongoose");

const PostSchema = mongoose.Schema ({
    title : {type:String , require:true},
    body : {type:String , require:true},
    device : {type:String ,enum:["PC", "TABLET", "MOBILE"],require:true}
},{
    versionKey : false
})

const PostModel = mongoose.model("Post",PostSchema)

module.exports = {PostModel}