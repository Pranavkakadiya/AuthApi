// const jwt=require('jsonwebtoken')

// module.exports=function(req,res,next){
//     const token=req.header('Authorization');
//     if(!token){
//         res.send('no token found');
//     }else{
//         try {
//             jwt.verify(token.split(' ')[1],'privatekey');
//             // jwt.verify(token,'privatekey');
//             // console.log(token.split(' ')[1])
//             next()

//         } catch (error) {
//             res.send(error).status(404);
//         }
//     }

// }

const jwt = require('jsonwebtoken')
module.exports = (req,res,next)=>{
    const token = req.header('Authorization');
    if (!token)
        res.send("No token found in the header");
    try {
        jwt.verify(token,"privatekey");
        next();
    } catch (error) {
        res.send("Invalid Token");
    }
}