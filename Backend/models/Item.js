const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
 user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
 },
 name:{
    type:String,
    required:true
 },
 itemImage:{
    type:String,
    required:true
 },
 description:{
    type:String
 },
 price:{
    type:String,
    required:true
 },
 location:{
    type:String,
    required:true
 },
 email:{
    type:String

 },
 date:{
    type:Date,
    default:Date.now
} 
})

module.exports = Item = mongoose.model('item',ItemSchema);