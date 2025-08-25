//? The base url is =>  http://localhost:5000

const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = express();

// Load environment variables
dotenv.config();


//middleware
app.use(cors());
app.use(express.json());

//database
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("✅ Connected to MongoDB");
}).catch(err => {
    console.error("❌ MongoDB connection error:", err);
});

// Set the port from environment or default to 5000
const port = process.env.PORT || 5000;






// Starting the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
