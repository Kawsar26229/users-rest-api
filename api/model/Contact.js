const mongoose = require('mongoose');
const validator = require('validator');
const { Schema, model } = mongoose;

const ContactSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        minlength: 3
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        validate: (v) => {
            return validator.isEmail(v)
        }
    }
});

const Contact = model('Contact', ContactSchema);
module.exports = Contact;