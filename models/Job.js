const mongoose = require('mongoose');


const JobSchema = new mongoose.Schema({
    title: { type: String,
         required: true
         },
    company: { type: String,
         required: true
         },
    location: { type: String,
         required: true
         },
    description: { type: String,
         required: true
         },
     salary: {
          type: Number,
          required: true
     },
    createdAt: { type: Date,
         default: Date.now
         },
});

const Job = mongoose.model('Job', JobSchema);

module.exports = mongoose.model('Job', JobSchema);