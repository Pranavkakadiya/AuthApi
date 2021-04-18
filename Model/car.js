

const mongoose=require('mongoose');

const schema = mongoose.Schema({

    title: {type:String},
    content: {type:String},

},{timestamps:true})


module.exports = mongoose.model("Car", schema)


