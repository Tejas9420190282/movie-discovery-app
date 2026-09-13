// db.js

const colors = require('colors');
const mongoose = require('mongoose');

const mongoDB = async () => {
    try {
        
        await mongoose.connect(process.env.MONGODB_URI)

        console.log('MongoDB conneted successfully'.bgGreen);
        

    } catch (error) {
         console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
}

module.exports = mongoDB;