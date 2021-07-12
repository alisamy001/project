const jwt = require('jsonwebtoken');
const config = require('config');
const joi = require('joi');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 155,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 155
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin: Boolean
})

UserSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, config.get('jwtprivatekey'));
    return token;
}

const User = mongoose.model('User', UserSchema);

function validateUser(User) {
    const schema = {
        name: joi.string().required().min(5).max(155),
        email: joi.string().required().min(5).max(155).email(),
        password: joi.string().required().min(5).max(50)
    }
    return joi.validate(User, schema);
}

exports.User = User;
exports.validate = validateUser;