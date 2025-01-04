const express = require('express');
const router = express.Router();
const upload = require('../config/multer');

//Upload CV/Resume
router.post('/resume', (req, res) => {
    upload(req, res, (err) => {
        if(err){
            res.status(400).json({ msg: err });
        } else {
            if (req.file == undefined) {
                res.status(400).json({ msg: 'No file selected!' });
            } else {
                const { jobId, jobTitle } = req.body;
                //Handle Job Information as needed
                res.json({ fileName: req.file.filename, filePath: `/uploads/${req.file.filename}`, jobId, jobTitle });

            }
        }
    });
});
module.exports = router;