const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['FullTime','Intern'],
        required: true
    },
    company: {
        type: String,
        required: true
    },
    from: {
        type: Date,
        required: true
    },
    to:{
        type: Date,
    },
    current: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        required: true
    }
},{timestamps:true});

const Experience = mongoose.model('Experience',experienceSchema);

module.exports = Experience;