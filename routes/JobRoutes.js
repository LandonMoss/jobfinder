const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

router.get('/', jobController.getJobs);
router.post('/', jobController.addJob);
router.get('/:id', jobController.getJobById);


// Get all jobs
router.get('/', async (req, res) => {
    try {
      const jobs = await Job.find();
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching jobs', error });
    }
  });

// Add a job
router.post('/', async (req, res) => {
    try {
      const { title, company, location, salary, description } = req.body;
      const job = new Job({ title, company, location, salary, description });
      await job.save();
      res.status(201).json({ message: 'Job added successfully', job });
    } catch (error) {
      res.status(500).json({ message: 'Error adding job', error });
    }
  });

//More to work on 1/6/2025 Reminder Landon Moss

module.exports = router;
