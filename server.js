const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const User = require('./models/User');


const jobRoutes = require('./routes/JobRoutes');
//const authRoutes = require('./routes/auth');
//const uploadRoutes = require('./routes/upload');

const app = express();
const port = process.env.PORT || 3000;




// Middleware
app.use(express.json());
app.use(cors());

app.post('/api/chatbot', async (req, res) => {
    const { message } = req.body;
    //Implement chatbot logic here
const responseMessage = await getChatbotResponse(message);
res.json({ message: responseMessage });
});

async function getChatbotResponse(message) {
   // Implement chatbot logic here
   if (message.toLowerCase().includes('hello')) {
    return 'Hello! How can I assist you today?';
} else if (message.toLowerCase().includes('job')) {
    return 'We have many job openings. What kind of job are you looking for?';
} else if (message.toLowerCase().includes('interview')) {
    return 'You can schedule an interview by clicking on the "Schedule Interview" button.';
} else if (message.toLowerCase().includes('resume')) {
    return 'You can upload your resume by clicking on the "Upload Resume" button.';
} else if (message.toLowerCase().includes('what is 1 + 1')) {
    return 'It is 2 bozo';
} else if (message.toLowerCase().includes('what is your name')) {
    return 'My name is Chatbot';
} else if (message.toLowerCase().includes('what is your age')) {
    return 'I am a bot, I do not have an age';
} else if (message.toLowerCase().includes('where do I schedule a interview')) {
    return 'You can schedule an interview by clicking on the "Schedule Interview" button.';
} else {
    return `You said: ${message}`;
}
}

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve HTML files from "views"
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});


// Serve HTML files from "FAANG"
app.get('/companies', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'companies.html'));
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
   //  useNewUrlParser: true,
   //  useUnifiedTopology: true,

})
.then(() => console.log('MongoDB connected successfully!'))
.catch(err => console.error('Error connecting to MongoDB:', err.message));

// Mongoose debug mode
mongoose.set('debug', true);

// Routes
app.use('/api/jobs', jobRoutes);
//app.use('/api/auth', authRoutes);
//app.use('/api/upload', uploadRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});