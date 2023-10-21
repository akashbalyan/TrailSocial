const mongoose = require('mongoose');

const TrailSchema = new mongoose.Schema({
 name:{
    type:String,
    required:true
 },
 trailImage:{
    type:String
 },
 description:{
    type:String
 },
 location:{
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
 date:{
    type:Date,
    default:Date.now
} 
})

module.exports = Trail = mongoose.model('trail',TrailSchema);