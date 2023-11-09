const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();

const User = require('../../models/User');
const Profile = require('../../models/Profile');

//@route  GET api/profile
//@desc    Get current user profile
//@access Private
router.get('/me', auth , async (req,res)=>{
    try {
        const profile = await Profile.findOne({user:req.user.id}).populate('user',['name']);
        if(!profile){
            res.status(400).json({msg:'There is no profile for this user'});
        }
        res.json(profile);
    } catch (error) {
        //console.error(error.message);
        res.status(501).json({msg:'Server Errror'});
    }
    //res.send('Profile route')
});

//@route  POST api/profile
//@desc    Create or update profile
//@access Private
router.post('/', auth , async (req,res)=>{
    try {
        const {
            userImage,
            facebook,
            instagram
        } = req.body;

        const profileFields = {};
        profileFields.user = req.user.id;
        if(userImage) profileFields.userImage = userImage;

        profileFields.social = {};
        if(facebook) profileFields.social.facebook = facebook;
        if(instagram) profileFields.social.instagram = instagram;

        try {
            
            let profile = await Profile.findOne({user:req.user.id});
            if(profile){
                profile = await Profile.findOneAndUpdate(
                    {user:req.user.id},
                    {$set:profileFields},
                    {new:true}
                )
                return res.json(profile);
            }

            profile = new Profile(profileFields);
            await profile.save();
            res.json(profile);
        } catch (error) {
            //console.error(error.message);
            res.status(501).send('Server Error');
        }
    } catch (error) {
        
    }
    //res.send('Profile route')
});

//@route   DELETE api/profile
//@desc    Delete a logged in user , profile and all their posts
//@access Private
router.delete('/',auth,async (req,res)=>{
    try {
        await Profile.findOneAndRemove({user:req.user.id});
        await User.findOneAndRemove({_id:req.user.id});
        res.json({msg:'User Account Deleted'});
    } catch (error) {
        //console.error('Error in deleting user account,pofile and posts');
        res.status(501).send('Server Error');
    }
})
module.exports = router; 