

const mongoose = require('mongoose');
//schema define
const schema = mongoose.Schema({
    name: String,
    origin: String,
    price:String,
    type:String
})


//create a model

module.exports = mongoose.model("Car", schema)


