const mongoose=require('mongoose')

const userschema=mongoose.Schema({
    uname:String,
    password:String
})

module.exports = mongoose.model("User", userschema);