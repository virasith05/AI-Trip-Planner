const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const Trip = require('../models/tripModel');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();
// 🔐 Middleware to verify token
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, 'your_secret_key');
        req.userId = decoded.userId;
        next();
    } catch (err) {
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }
};

// ✅ Route: Save a new trip
router.post('/save-trip', authMiddleware, async (req, res) => {
    try {
        const aiHotel = req.body.hotel || {};

        // Fix: ensure name and desc are strings
        const parsedHotel = (typeof aiHotel.name === 'string')
            ? {
                name: aiHotel.name,
                desc: aiHotel.description || "No description",
                fullDetails: aiHotel
            }
            : {
                name: aiHotel.name?.name || "No name",
                desc: aiHotel.name?.description || "No description",
                fullDetails: aiHotel
            };

        const trip = new Trip({
            userId: req.userId,
            itinerary: req.body.itinerary,
            hotel: parsedHotel,
            raw: req.body.raw
        });

        await trip.save();
        res.status(200).json({ success: true, message: 'Trip saved successfully!' });
    } catch (error) {
        console.error("Trip saving error:", error);
        res.status(500).json({ success: false, message: 'Failed to save trip' });
    }
});

// ✅ Route: Get trips for logged-in user
router.get('/my-trips', authMiddleware, async (req, res) => {
    try {
        const trips = await Trip.find({ userId: req.userId }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, trips });
    } catch (error) {
        console.error("Trip fetching error:", error);
        res.status(500).json({ success: false, message: 'Failed to load trips' });
    }
});
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const trip = await Trip.findOneAndDelete({ _id: req.params.id, userId: req.userId });
        if (!trip) {
            return res.status(404).json({ success: false, message: "Trip not found or unauthorized" });
        }
        res.json({ success: true, message: "Trip deleted successfully" });
    } catch (err) {
        console.error("Delete trip error:", err);
        res.status(500).json({ success: false, message: "Failed to delete trip" });
    }
});

router.post('/register', async (req, res) => {
    try {
        const userExist = await User.findOne({ email: req.body.email });
        if (userExist) {
            return res.status(400).send({
                success: false,
                message: "User already registered"
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;
        const newUser = new User(req.body);
        await newUser.save();
        // const token = jwt.sign({ userId: newUser._id }, 'your_secret_key', { expiresIn: '2d' });
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
        const userExist = await User.findOne({ email: req.body.email });
        if (!userExist) {
            return res.status(404).send({
                success: false,
                message: "User not registered",
            });
        }
        const validPassword = await bcrypt.compare(req.body.password, userExist.password);
        if (!validPassword) {
            return res.status(401).send({
                success: false,
                message: "Invalid password",
            });
        }
        const jwttoken = jwt.sign({ userId: userExist._id }, 'your_secret_key', { expiresIn: '2d' });
        return res.send({
            success: true,
            message: "Login successful",
            token: jwttoken,
            user: {
                name: userExist.name,
                email: userExist.email,
                id: userExist._id
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send({
            success: false,
            message: "Login failed"
        });
    }
});
router.put('/update-profile', authMiddleware, async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.userId,
            { name: req.body.name },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, message: "Profile updated", user });
    } catch (err) {
        console.error("Profile update error:", err);
        res.status(500).json({ success: false, message: "Profile update failed" });
    }
});

// Subscribe endpoint
router.post('/subscribe', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, message: 'Email required' });

  // Configure your SMTP transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Thank you for subscribing!',
    text: 'Thank you for subscribing to AI Trip Planner!'
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
});

module.exports = router;
