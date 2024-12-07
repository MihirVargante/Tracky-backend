const mongoose = require("mongoose");
require("dotenv").config(); // To access environment variables

const connectDB = async () => {
  try {
    console.log("here is your mongo url---->",process.env.MONGO_URI)
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1); // Exit the process if the connection fails
  }
};

module.exports = connectDB;
