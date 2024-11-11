const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');  // Import the User model
const router = express.Router();

// Signup API: Register a new user
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user object
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        // Save the user to the database
        await newUser.save();

        // Respond with success
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login API: Authenticate a user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        // If user doesn't exist or password is incorrect, return error
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Respond with success
        res.status(200).json({ message: 'Login successful', user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;  // Export the router to use in app.js
