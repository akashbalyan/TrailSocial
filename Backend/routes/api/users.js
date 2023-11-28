const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const {body,validationResult} = require('express-validator');


const User = require('../../models/User');

//@route  POST api/users
//@desc   Register User
//@access Public
router.post('/',[
    body('name').not().isEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please enter a valid email id'),
    body('password').isLength({ min: 6 }).withMessage('Password should be of minimum 6 characters')
],async (req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const  {name ,email ,password } = req.body;
    //check whether user exists
    try {
        let user = await User.findOne({email});
        if(user){
            res.status(400).json({errors:[{msg:'User already Exist'}]})
        }
    
    // if the user doesnt exist add new user
        user = new User({
            name,
            email,
            password
        })
    //Encrypting password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt);

        await user.save();

    //JWT
        const payload = {
            user:{
                id:user.id
            }
        };
        jwt.sign(
            payload,
            config.get('jwtToken'),
            {
                expiresIn:360000
            },
            (err,token) =>{
                if(err){
                    throw err;
                }
                res.json({token})
            }
        )

        //res.send('User Registered');
    } catch (error) {
        
    }
    

});


module.exports = router;