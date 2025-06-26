const express = require('express');
const router = express.Router();
const User = require('../models/userModel'); // Renamed from 'abc' to 'User' for clarity
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
    try {
        const userExist = await User.findOne({ email: req.body.email });
        if (userExist) {
            return res.send({
                success: false,
                message: "User already registered"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const password = req.body.password;
        const hashedPassword = bcrypt.hashSync(password, salt);
        req.body.password = hashedPassword;

        const newUser = new User(req.body);
        await newUser.save();

        res.send({
            success: true,
            message: "User registered successfully",
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).send({
            success: false,
            message: "Registration failed"
        });
    }
});

router.post('/login', async (req, res) => {
    try {
        // FIXED: Changed from 'user' to 'User' (this was the bug!)
        const userExist = await User.findOne({ email: req.body.email });
        
        if (!userExist) {
            return res.send({
                success: false,
                message: "User not registered",
            });
        }
        
        // Validate password 
        const validPassword = await bcrypt.compare(req.body.password, userExist.password);
        
        if (!validPassword) {
            return res.send({
                success: false,
                message: "Invalid password",
            });
        } else {
            return res.send({
                success: true,
                message: "Login successful",
                user: {
                    name: userExist.name,
                    email: userExist.email,
                    id: userExist._id // optional
                }
                });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send({
            success: false,
            message: "Login failed"
        });
    }
});

module.exports = router;