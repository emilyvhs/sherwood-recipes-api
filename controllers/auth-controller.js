const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');

const registerUser = async (req, res) => {

    try {

        const { username, email, password } = req.body;

        const userExists = await User.findOne({email});

        if (userExists) {
            return res.status(400).json({
                success: false,
                message: 'User already exists - please log in instead!'
            });
        };

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword      
        });

        await newUser.save();

        if (newUser) {
            res.status(201).json({
                success: true,
                message: 'New user registered successfully!'
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Unable to register new user - please try again'
            });
        };

    } catch(error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal error! Please try again'
        });
    };
};

module.eports = {
    registerUser,
};