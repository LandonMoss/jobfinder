const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const router = express.Router();

//User data
const users = [];

// Register a new user
router.post('/register', (req, res) => {
    const { name, email, password } = req.body; 
    //Check if user already exists
    const userExists = users.find(user => user.email === email);
    if (userExists) {
        return res.status(400).json({ msg: 'User already exists' });
    }
    //Add user to users array
    const newUser = {
        name,
        email,
        password
    };
    users.push(newUser);
    //return success response
    res.status(201).json({ msg: 'User registered successfully' });
});


    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            name,
            email,
            password
        });

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

// Login a user
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    //Check if user exists
    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
    }
    //return success response
    res.status(200).json({ msg: 'User logged in successfully' });
});
  


    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

    module.exports = router;

