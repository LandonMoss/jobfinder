const mongoose = require('mongoose');

require('dotenv').config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        
        console.log("MongoDB connected....");
    } catch (err) {
        console.error(err.message);
        console.log("MongoDB could not connect...");
        console.error('Full Error',err);
        process.exit(1);
    }
};
//Module exports to connect to the database!!!
module.exports = connectDB;
