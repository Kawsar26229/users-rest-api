const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/User');

const userRegistrationController = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            res.json({
                error: err
            })
        }
        const user = new User({
            email: req.body.email,
            password: hash
        })
        user.save()
            .then(result => {
                res.status(201).json({
                    message: 'Registration Successful',
                    user: result
                })
            })
            .catch(error => {
                res.status(500).json({
                    message: 'Registration Failed. Email Should not matched',
                    error
                })
            })
    })
};

const userLoginController = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (err) {
                        res.json({
                            message: 'Error Occured',
                            error: err
                        })
                    }
                    if (result) {
                        let token = jwt.sign({email: user.email, id: user._id}, 'SECRET', {expiresIn: '2h'})
                        res.status(200).json({
                            message: 'Login Successful',
                            token
                        })
                    }
                })
            } else {
                res.status(500).json({
                    message: 'Login Failed. Password or Email doesn\'t matched'
                })
            }
        })
        .catch(error => {
            res.json({
                message: 'User Not Found',
                error
            })
        })
};

const userGetController = (req, res, next) => {
    User.find()
        .then(user => {
            res.json({
                message: 'User Found Successfully',
                user
            })
        })
        .catch(error => {
            res.status(500).json({
                message: 'User Not Found',
                error
            })
        })
};

module.exports = {
    userRegistrationController,
    userLoginController,
    userGetController
}