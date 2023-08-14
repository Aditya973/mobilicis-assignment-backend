const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true,
        max: [30,'First name can not be more than 30 characters']
    },
    lastName: {
        type: String,
        required: true,
        max: [30,'Last name can not be more than 30 characters']
    },
    avatar: {
        type: String,
        default:
            "https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png",
    },
    phone: {
        type: Number,
    },
    bio: {
        type: String,
        max: [200, 'bio can not be more than 200 words']
    },
    connections: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    skills: {      
        type: Array,
        default: []
    },
    certificates: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Certification'
        }
    ],
    experience: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Experience'
        }
    ],
    education: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Education'
        }
    ],
}, { timestamps: true });

const Profile = mongoose.model('Profile',profileSchema);

module.exports = Profile;
