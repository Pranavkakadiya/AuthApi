const express=require('express')
const mongoose=require('mongoose')
const route=require('./route')
const body_parser=require('body-parser')

var cors = require('cors')

var port = process.env.PORT || 5000;

// mongoose.connect("mongodb://localhost:27017/UserApi",{useNewUrlParser:true,useUnifiedTopology:true}).then(
    //  mongodb+srv://pranav:<password>@cluster0.mnb30.mongodb.net/<dbname>?retryWrites=true&w=majority

    // mongoose.connect('mongodb://localhost:27017/UserApi',{ useNewUrlParser: true, useUnifiedTopology: true },(err)=>{
mongoose.connect("mongodb+srv://pranav:12345@cluster0.mnb30.mongodb.net/UserApi?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true}).then(
    ()=>{
        const app=express();
        app.use(body_parser.urlencoded({ extended: true }))
        app.use(express.json())
        app.use(cors())
        app.use('/api',route);
        app.listen(port, () => {
            console.log('App listening on port !'+port);
        });
    }
)