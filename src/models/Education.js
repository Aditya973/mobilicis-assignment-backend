const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    institute: {
        type: String,
        required: true,
    },
    from: {
        type: Date,
        required: true,
    },
    to: {
        type: Date
    },
    degree: {
        type: String,
        required: true
    },
    current: {
        type: Boolean,
        default: false,
    },
    description: {
        type: String,
        required: true
    }
});

const Education = mongoose.model('Education',educationSchema);

module.exports = Education;