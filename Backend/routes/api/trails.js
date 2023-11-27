

const express = require('express');

const Trail = require('../../models/Trail');
const router = express.Router();

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'trailUploads/') // Define the uploads folder
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) // Use the original name of the file
    }
});

const upload = multer({ storage: storage });


//@route  GET api/trails
//@desc    get all trails
//@access  Private
router.get('/' , async (req,res)=>{

    try {
        const trails = await Trail.find();
        return res.json(trails);
        
    } catch (error) {
        res.status(500).send({msg:'Server Error'});
    }
});

//@route  POST api/trails
//@desc    add a trail
//@access  Public
router.post('/', upload.single('file') ,async (req,res)=>{
    
    try {
        console.log(req);
        const filePath = req.file.path;
        
        const newTrail = new Trail( {
            name:req.body.name,
            trailImage:filePath,
            description:req.body.description,
            location:req.body.location,
            length:req.body.length,
            time:req.body.time,
            level:req.body.level,
            likes:req.body.likes
        });

       await newTrail.save();
       res.json(newTrail);
        
    } catch (error) {
        console.log(error);
        res.status(500).send({msg:'Server Error'});
    }
});


//@route  PUT api/trails/like/:id
//@desc    Add like to trail
//@access  Private

router.put('/addlike/:id', async (req,res)=>{
    try {
        const trail = await Trail.findById(req.params.id);

        trail.likes = trail.likes +1;
        
        await trail.save();
        res.status(200).json({msg:'Trail liked'});
        
    } catch (error) {
        res.status(500).send({msg:'Server Error'});
    }
});

//@route  PUT api/trails/like/:id
//@desc    Remove like to trail
//@access  Private

router.put('/removelike/:id', async (req,res)=>{
    try {
        const trail = await Trail.findById(req.params.id);

        trail.likes = Number(trail.likes) - 1;
        
        await trail.save();
        res.status(200).json({msg:'Trail Unliked'});
        
    } catch (error) {
        res.status(500).send({msg:'Server Error'});
    }
});


module.exports = router;