const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    userImage: {
        type: String  // Assuming you store the image URL as a string
    },
    social:{
        facebook:{
            type:String
        },
        instagram:{
            type:String
        }
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = Profile = mongoose.model('profile',ProfileSchema);