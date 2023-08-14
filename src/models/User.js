const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: [5,"Password should have minimum length of 5"]
    },
    username: {
        type: String,
        required: true,
        unique:true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
},{timestamps:true});

userSchema.pre('save',function(next){
    const user = this;
    const encryptedPassword = bcrypt.hashSync(user.password,10);
    user.password = encryptedPassword;
    next();
})


const User = mongoose.model('User',userSchema);

module.exports = User;
