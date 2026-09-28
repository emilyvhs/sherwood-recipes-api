const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter a username'],
        trim: true,
        minLength: [2, 'Username too short! Must be longer than 1 character'],
        maxLength: [20, 'Username too long! Must be shorter than 20 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        trim: true        
    }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);