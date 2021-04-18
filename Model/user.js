// const mongoose=require('mongoose')

// const userschema=mongoose.Schema({
//     uname:String,
//     password:String
// })
// //this is for use api
// module.exports = mongoose.model("User", userschema);


const mongoose = require('mongoose');
const usersSchema =new mongoose.Schema({
    uname: { 
        type: String,
        required: [true, 'Video username field is required']
    }, 
    password: { 
        type: String,
        required: [true, 'Video password field is required']
    }, 
}, { timestamps: true });
module.exports = mongoose.model("User", usersSchema);