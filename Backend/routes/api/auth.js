const express = require('express');
const auth = require('../../middleware/auth')
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {body,validationResult} = require('express-validator');

const router = express.Router();

//@route  GET api/auth
//@desc   Authenticate User using token and return user details except password
//@access Public
router.get('/', auth, async (req,res)=>{
    
    try {
        const user = await User.findById(req.user.id).select('-password');

        res.json(user)
    } catch (error) {
        
        res.status(500).send('Server Error');
    }
    //res.send('Auth route')

    }
);


//@route  POST api/auth
//@desc   Authenticate User & get token
//@access Public
router.post('/',[
    body('email').isEmail().withMessage('Please enter a valid email id'),
    body('password').exists().withMessage('Password is required')
],async (req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const  { email ,password } = req.body;
    //check whether user exists
    try {
        let user = await User.findOne({email});
        if(!user){
            res.status(400).json({errors:[{msg:'Invalid Credentials'}]});
        }

        const passwordMatch = await bcrypt.compare(password,user.password)

        if(!passwordMatch){
            res.status(400).json({errors:[{msg:'Invalid Credentials'}]});
        }
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