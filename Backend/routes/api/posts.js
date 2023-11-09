const express = require('express');
const {body , validationResult} = require('express-validator')
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Post = require('../../models/Post');
const router = express.Router();

//@route  POST api/posts
//@desc    add a post
//@access Private
router.post('/', auth,[
    body('text').not().isEmpty().withMessage('Post text is required')
] ,async (req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    
    try {

        const user  = await User.findById(req.user.id).select('-password');
        const newPost = new Post( {
            user:req.user.id,
            name:user.name,
            text:req.body.text,
            postImage:req.body.postImage,
        });

       await newPost.save();
       res.json(newPost);
        
    } catch (error) {
        //console.error(error.message);
        res.status(500).send({msg:'Server Error'});
    }
});


//@route  GET api/posts
//@desc    get all posts
//@access  Private
router.get('/', auth , async (req,res)=>{

    try {
        const posts = await Post.find().sort({date:-1});
        return res.json(posts);
        
    } catch (error) {
        //console.error(error.message);
        res.status(500).send({msg:'Server Error'});
    }
});

//@route  GET api/posts/:id
//@desc    get post by id
//@access  Private
router.get('/:id', auth , async (req,res)=>{

    try {
        const post = await Post.findById(req.params.id);

        if(!post){
            return res.json({msg:'No Post found by this id'})
        }
        return res.json(post);
        
    } catch (error) {
        if(error.kind == 'ObjectId'){
            return res.status(404).json({msg:'No Post found by this id'})
        }
        //console.error(error.message);
        res.status(500).send({msg:'Server Error'});
    }
});

//@route  DELETE api/posts/:id
//@desc    Delete post by id
//@access  Private
router.delete('/:id', auth , async (req,res)=>{

    try {
        const post = await Post.findById(req.params.id);

        if(!post){
            return res.status(404).json({msg:'No Post found by this id'})
        }
        if(post.user.toString()!==req.user.id){
            return res.status(401).json({msg:'User not Authorized to delete the post'});
        }

        await Post.findByIdAndRemove(req.params.id);

        return res.json({msg:'Post Deleted'});
        
    } catch (error) {
        if(error.kind == 'ObjectId'){
            return res.status(404).json({msg:'No Post found by this id'})
        }
        //console.error(error.message);
        res.status(500).send({msg:'Server Error'});
    }
});


//@route  PUT api/posts/like/:id
//@desc    Like a post by id
//@access  Private

router.put('/like/:id', auth , async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id);

        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
                const removeIndex=post.likes.map(like=>like.user.toString()).indexOf(req.user.id);
                post.likes.splice(removeIndex,1);
                //return res.json(post.likes);
                //return res.status(400).json({msg:'Post already liked'});
        }else{
            post.likes.unshift({user:req.user.id});
        }
        
        await post.save();
        res.json(post.likes);
        //return res.status(200).json({msg:'Post liked'});
        ///


        // const post =await Post.findById(req.params.id);
        // if(post.likes.filter(like=>like.user.toString()===req.user.id).length===0){
        //     return res.json({msg:'Post Not been liked Yet'});
        // }
        // const removeIndex=post.likes.map(like=>like.user.toString()).indexOf(req.user.id);
        // post.likes.splice(removeIndex,1);
        // await post.save();
        // res.json(post.likes);
        ///
        
    } catch (error) {
        //console.error(error.message);
        res.status(500).send({msg:'Server Error'});
    }
});

//@route  PUT api/posts/comment/:id
//@desc    Add Comment to a post by post id
//@access  Private

router.put('/comment/:id', auth,[
    body('text').not().isEmpty().withMessage('Post text is required')
]  , async (req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try {
        const user  = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.id);

        const newComment = {
            text:req.body.text,
            name:user.name,
            userImage:user.userImage,
            user:req.user.id
        };
        post.comments.unshift(newComment);

        await  post.save();

        return res.status(200).json(post.comments);
        
    } catch (error) {
        //console.error(error.message);
        res.status(500).send({msg:'Server Error'});
    }
});

//@route  DELETE api/posts/comment/:id/:comment_id
//@desc   Delete a Comment
//@access private

router.delete('/comment/:id/:comment_id',auth,async (req,res)=>{
    try{
        const post =await Post.findById(req.params.id);
        const comment=await post.comments.find(comment=>comment.id === req.params.comment_id);

        if(!comment){
            return res.status(404).json({msg:'Comment Not Exist'});
        }

        if(comment.user.toString()!==req.user.id){
            return res.status(401).json({msg:'User not authorized'});
        }

        const removeIndex=post.comments.map(comment=>comment.user.toString()).indexOf(req.user.id);
        post.comments.splice(removeIndex,1);
        await post.save();

        res.json(post.comments);
    }catch(err){
        //console.error(err.message);
        res.status(500).send('Server Error');
    }
});



module.exports = router;