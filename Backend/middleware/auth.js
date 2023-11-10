const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req,res,next){
    //get token from header
    const token = req.header('x-auth-token');
    
    //console.log("***************************inside auth **************************************")
    //console.log(req);

    //if token not available
    if(!token){
        return res.status(401).json({msg:'No token, authorization failed'})
    }

    //Verify token
    try{
        const decoded = jwt.verify(token,config.get('jwtToken'));

        req.user = decoded.user;
        next();
    }catch(err){
        res.status(401).json({msg:'Token is not valid'});
    }


}