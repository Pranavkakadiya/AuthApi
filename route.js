// const router = require('express').Router();
// const User = require('./Model/user')
// const Car = require('./Model/car')
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')

// const auth = require('./verifytoken')

// const express = require('express');
// const bodyParser = require('body-parser');
// router.use(bodyParser.urlencoded({ extended: true }));
// router.use(express.json());
// router.use(cors());

// router.post("/register", async (req, res) => {

//     const salt = await bcrypt.genSalt(10)
//     const hashpass = await bcrypt.hash(req.body.password, salt);

//     const user = new User({
//         uname: req.body.uname,
//         password: hashpass
//     })
//     await user.save();
//     res.send(user).status(200);
// });


// router.post('/login', async (req, res) => {
//     try {
//         const user = await User.findOne({ uname: req.body.uname });
//         if (!user) {
//             return res.send('user dosent exist');
//         } else {
//             const isvalid = await bcrypt.compare(req.body.password, user.password);
//             if (!isvalid) {
//                 res.send("password incorrect");
//             } else {
//                 const token = await jwt.sign({ _id: user._id }, 'privatekey')
//                 res.send({ token })
//                 // res.header('access-token', token);
//                 // console.log(res.send(token)) 
//             }
//         }
//     } catch (error) {
//         res.send(error);
//     }

// });

// //public route
// router.get('/user', async (req, res) => {
//     // res.json({
//     //     title:"c++",
//     //     price:45
//     // },{
//     //     title:"c",
//     //     price:40
//     // },{
//     //     title:"python",
//     //     price:44
//     // })
//     const user = await User.find();
//     setTimeout(() => {

//         res.send(user);
//     }, 5000)
// });
// //private route use function from verifytoken



const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./Model/user');
const Car = require('./Model/car')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const auth = require('./verifyToken');
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json());
router.use(cors());


// For register
router.post("/register", async (req, res, next) => {
    var saltkey = await bcrypt.genSalt(10);
    var hasedPass = await bcrypt.hash(req.body.password, saltkey);
    const user = new User({
        uname: req.body.uname,
        password: hasedPass
    });
    await user.save();
    res.send({ "text": "Registerd Successfully" });
});

// For login User
router.post("/login", async (req, res, next) => {
    const user = await User.findOne({ uname: req.body.uname });
    if (!user)
        return res.send("User Not Found..!!");
    else {
        const isValid = await bcrypt.compare(req.body.password, user.password);
        if (!isValid)
            return res.send("Invalid Password Try Again...")
        else {
            const token = await jwt.sign({ _id: user._id }, "privatekey");
            // res.header("Authorization", token);
            res.send({ token });
        }
    }
});


router.get('/users', auth, async (req, res) => {

    const user = await User.find();
    setTimeout(() => {

        res.send(user);
    }, 5000)
    console.log(user)
    // res.json({
    //     price:10000,
    //     discount:"10%"
    // })
});



router.get("/cars", auth, async (req, res) => {

    const posts = await Car.find()

    setTimeout(() => {

        res.send(posts)

    }, 5000)

})

router.get("/cars/:id", auth, async (req, res) => {
    try {
        console.log(req.params.id)

        const data = await Car.findOne({ _id: req.params.id })

        console.log(data)
        res.send(posts)
    }catch{
        res.status(404)

        res.send({ error: "Post doesn't exist!"+req.params.id })
    }


})


router.post("/cars", auth, async (req, res) => {

    const data = new Car({

        title: req.body.title,
        content: req.body.content,

    })

    await data.save()

    res.send(data)

})

router.patch("/cars/:id", auth, async (req, res) => {

    try {
        console.log(req.params.id)

        const data = await Car.findOne({ _id: req.params.id })

        console.log(data)


        if (req.body.title) {

            data.title = req.body.title

        }


        if (req.body.content) {

            data.content = req.body.content

        }
        await data.save()

        res.send(data)

    } catch {

        res.status(404)

        res.send({ error: "Post doesn't exist!" })

    }

})

router.delete("/cars/:id", auth, async (req, res) => {

    try {

        console.log(req.params.id)



        const data = await Car.deleteOne({ _id: req.params.id })
        console.log(data)

        res.status(200).send(data)

    } catch {

        res.status(404)

        res.send({ error: "Post doesn't exist!" })

    }

})





module.exports = router;