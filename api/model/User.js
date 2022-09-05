const mongoose = require('mongoose');
const validator = require('validator');
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: (v) => {
            return validator.isEmail(v)
        },
        message: '{VALUE} is not an email'
    },
    password: {
        type: String,
        required: true
    }
});

const User = model('User', UserSchema);
module.exports = User;