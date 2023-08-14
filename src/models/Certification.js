const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    }
},{timestamps: true});

const Certification = mongoose.model('Certification',certificationSchema);

module.exports = Certification;