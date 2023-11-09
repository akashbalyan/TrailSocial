

const express = require('express');

const Trail = require('../../models/Trail');
const router = express.Router();


//@route  GET api/trails
//@desc    get all trails
//@access  Private
router.get('/' , async (req,res)=>{

    try {
        const trails = await Trail.find().sort({date:-1});
        return res.json(trails);
        
    } catch (error) {
        //console.error(error.message);
        res.status(500).send({msg:'Server Error'});
    }
});