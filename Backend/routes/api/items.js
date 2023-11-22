const express = require('express');
const {body , validationResult} = require('express-validator')
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Item = require('../../models/Item');
const router = express.Router();

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'itemUploads/') // Define the uploads folder
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) // Use the original name of the file
    }
});

const upload = multer({ storage: storage });


//@route  POST api/items
//@desc    add a item
//@access Private
router.post('/', upload.single('file'), auth,[
    body('name').not().isEmpty().withMessage('name text is required'),
    body('itemImage').not().isEmpty().withMessage('itemImage text is required'),
    body('price').not().isEmpty().withMessage('price text is required'),
    body('location').not().isEmpty().withMessage('location text is required')
] ,async (req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    
    try {

        const user  = await User.findById(req.user.id).select('-password');
        const filePath = req.file.path;
        //console.log(req.user);
        const newItem = new Item( {
            user:req.user.id,
            name:req.body.name,
            itemImage:filePath,
            price:req.body.price,
            location:req.body.location,
            description:req.body.description,
            email:user.email
        });

       await newItem.save();
       res.json(newItem);
        
    } catch (error) {
        //console.error(error.message);
        res.status(500).send({msg:'Server Error'});
    }
});


//@route  GET api/items
//@desc    get all items
//@access  Private
router.get('/', auth , async (req,res)=>{

    try {
        const items = await Item.find().sort({date:-1});
        return res.json(items);
        
    } catch (error) {
        //console.error(error.message);
        res.status(500).send({msg:'Server Error'});
    }
});


//@route  DELETE api/items/:id
//@desc    Delete item by id
//@access  Private
router.delete('/:id', auth , async (req,res)=>{

    try {
        const item = await Item.findById(req.params.id);

        if(!item){
            return res.status(404).json({msg:'No Item found by this id'})
        }
        if(item.user.toString()!==req.user.id){
            return res.status(401).json({msg:'User not Authorized to delete the item'});
        }

        await Item.findByIdAndRemove(req.params.id);

        return res.json({msg:'Item Deleted'});
        
    } catch (error) {
        if(error.kind == 'ObjectId'){
            return res.status(404).json({msg:'No Item found by this id'})
        }
        //console.error(error.message);
        res.status(500).send({msg:'Server Error'});
    }
});





module.exports = router;