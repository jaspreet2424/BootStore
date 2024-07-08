const mongoose = require('mongoose');

const connectDatabase = async() => {
    try {

        await mongoose.connect(process.env.DATABASE_URI);
        console.log("Database connected")
    } catch (error) {
        console.log(`Error occured in connecting to database ${error}`);
    }
}

module.exports = connectDatabase;