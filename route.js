const router = require('express').Router();
const User = require('./Model/user')
const Car = require('./Model/car')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const auth = require('./verifytoken')

const express = require('express');
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json());
router.use(cors());

router.post("/register", async (req, res) => {

    const salt = await bcrypt.genSalt(10)
    const hashpass = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        uname: req.body.uname,
        password: hashpass
    })
    await user.save();
    res.send(user).status(200);
});


router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ uname: req.body.uname });
        if (!user) {
            return res.send('user dosent exist');
        } else {
            const isvalid = await bcrypt.compare(req.body.password, user.password);
            if (!isvalid) {
                res.send("password incorrect");
            } else {
                const token = await jwt.sign({ _id: user._id }, 'privatekey')
                res.send({ token })
                // res.header('access-token', token);
                // console.log(res.send(token)) 
            }
        }
    } catch (error) {
        res.send(error);
    }

});

//public route
router.get('/user', async (req, res) => {
    // res.json({
    //     title:"c++",
    //     price:45
    // },{
    //     title:"c",
    //     price:40
    // },{
    //     title:"python",
    //     price:44
    // })
    const user = await User.find();
    setTimeout(() => {

        res.send(user);
    }, 5000)
});
//private route use function from verifytoken
router.get('/cars', auth, async (req, res) => {

    const user = await Car.find();
    setTimeout(() => {

        res.send(user);
    }, 5000)
    // res.json({
    //     price:10000,
    //     discount:"10%"
    // })
});



module.exports = router;