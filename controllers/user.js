const jwt = require("jsonwebtoken"); // to generate signed token
const expressJwt = require("express-jwt"); // for authorization check
const User = require("../models/user")
const {errorHandler} = require("../helpers/dbErrorHandler")

exports.signup = (req, res) => {
    const user = new User(req.body)
    user.save((err, user) => {
        if(err){
            return res.status(400).json({
                err: errorHandler(err)
            })
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({
            user
        })
    })
}

exports.signin = (req, res) => {
    const { email, password } = req.body;
    User.findOne({email}, (err, user) => {
        if(err || !user){
            return res.send(400).json({
                err: "User with this email doesn't exist. Please signup!!"
            })
        }

        //if user is found, make sure email and password matches
        //create authenticate method in user model
        if(!user.authenticate){
            return res.send(401).json({
                error: 'Email and Password are nor correct!!'
            })
        }

        //generate a signed token with user id and secret
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
        //persist the token as 't' in cookie with expiry date
        res.cookie('t', token, {expire: new Date() + 9999})
        //return response with user and token to frontend
        const { _id, name, email, role } = user
        return res.json({token, user: {_id, name, email, role}})

    })
}