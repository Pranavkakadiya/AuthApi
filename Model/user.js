const mongoose=require('mongoose')

const userschema=mongoose.Schema({
    uname:String,
    password:String
})
//this is for use api
module.exports = mongoose.model("User", userschema);