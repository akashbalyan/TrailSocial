const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
 user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
 },
 name:{
    type:String,
    required:true
 },
 userImage:{
    type:String
 },
 text:{
    type:String
 },
 postImage:{
    type:String
 },
 likes:[
    {
        user:{
            type:mongoose.Schema.ObjectId,
            ref:'user'
        }
    }
 ],
 comments:[
    {
        user:{
            type:mongoose.Schema.ObjectId,
            ref:'user'
        },
        text:{
            type:String,
            required:true
        },name:{
            type:String
        },
        userImage:{
            type:String
        },
        date:{
            type:Date,
            default:Date.now
        } 
    }
 ],
 date:{
    type:Date,
    default:Date.now
} 
})

module.exports = Post = mongoose.model('post',PostSchema);