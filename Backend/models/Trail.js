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
 length:{
   type:String
 },
 time:{
   type:String
 },
 level:{
   type:String
 },
 likes:{
   type:Number
 }
})

module.exports = Trail = mongoose.model('trail',TrailSchema);