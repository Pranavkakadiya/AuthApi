const jwt=require('jsonwebtoken')

module.exports=function(req,res,next){
    const token=req.header('Authorization');
    if(!token){
        res.send('no token found');
    }else{
        try {
            jwt.verify(token.split(' ')[1],'privatekey');
            // jwt.verify(token,'privatekey');
            // console.log(token.split(' ')[1])
            next()

        } catch (error) {
            res.send(error).status(404);
        }
    }

}