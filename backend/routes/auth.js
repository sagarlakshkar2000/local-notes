
const express = require('express')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/User_Module'); //import userschema 
const fetchUser = require('../middleware/fetUser')

const secret_Key = 'DataEncryptedBySagar'

// const fs = require('fs');
// const data = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));
// const photos = data.photos;



// Route 1 : 
router.get('/fetchuser/',  fetchUser, async (req, resp) => {

    const user = await UserModel.find({user : req.user.id})
    resp.send(user)

});

// Route 2 : create New User Api 
router.post('/users/', [
    body('name', 'UserName Length must be greater then 3').isLength({ min: 3 }),
    body('email', 'Valid Email is Required ').isEmail(),
    body('password', 'Password Length must be greater then 4').isLength({ min: 4 }),
], async (req, resp) => {


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return resp.status(400).json({ errors: errors.array() });
    }

    try {
        let user = await UserModel.findOne({ email: req.body.email })
        if (user) {
            return resp.status(400).json({ error: "sorry a user is already registered with this email address." })
        }

        const salt = await bcrypt.genSalt(10)
        const secret_password = await bcrypt.hash(req.body.password, salt);


        user = await UserModel.create({
            name: req.body.name,
            password: secret_password,
            email: req.body.email
        })

        const data = {
            user: {
                "ID": UserModel.id
            }
        }
        const authToken = jwt.sign(data, secret_Key);


        resp.json({ authToken });
    } catch (error) {
        console.log(error.message)
        resp.status(500).send("some Internal Error Occured");
    }
});

// Route 3 :Login Existing User Api 
router.post('/users/login', [
    body('email', 'Valid Email is Required ').isEmail(),
    body('password', 'Password Length must be greater then 4').isLength({ min: 4 }),
], async (req, resp) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return resp.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {

        let user = await UserModel.findOne({ email: email });
        const passwordCompare = bcrypt.compare(password,user.password)

        if(!user){
            return resp.status(400).json({ error: "Enter Valid Credentials." })
        }

        if(!passwordCompare){
            return resp.status(400).json({ error: "Enter Valid Credentials." })
        }

        const data = {
            user: {
                "ID": user.id
            }
        }

        const authToken = jwt.sign(data, secret_Key);
        const userInfo = UserModel.users ;
     
        resp.json({ data,authToken });

    } catch (error) {
        console.log(error.message)
        resp.status(500).send("some Internal Error Occured");
    }

});


// Route 4 :Login Existing User Api 

router.post('/getuser/:id',fetchUser ,async (req, resp) => {

    try {

        userId = req.user.ID;
        const user = await UserModel.findById(userId).select("-password")
        resp.send({user,status : "user infomation fetched successfully "})

      } catch (error) {
        console.error(error.message);
        resp.status(500).send("Internal Server Error");
      }
});
exports.router = router






