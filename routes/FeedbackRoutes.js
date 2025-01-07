const express = require('express');
const Feedback = require('../models/Feedback');
const router = express.Router();

//Get all feedback
router.get('/', async (req, res) => {
  try {
    const feedback = await Feedback.find();
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feedback', error });
  }
});

//Add feedback
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const feedback = new Feedback({ name, email, message });
    await feedback.save();
    res.status(201).json({ message: 'Feedback added successfully', feedback });
  } catch (error) {
    res.status(500).json({ message: 'Error adding feedback', error });
  }
});