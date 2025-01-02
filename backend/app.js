//C:\Users\shant\Downloads\Appointment-Management-System-main\Appointment-Management-System-main\backend\app.js

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./db");

const app = express();

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', require('./routes/routes'));

// Export app for serverless functions
module.exports = app;

