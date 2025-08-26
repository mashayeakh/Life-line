// //? The base url is =>  http://localhost:5000

// const express = require('express');
// const cors = require('cors');
// const dotenv = require("dotenv");
// const mongoose = require("mongoose");

// const app = express();

// // Load environment variables
// dotenv.config();


// //middleware
// app.use(cors());
// app.use(express.json());

// //database
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log("✅ Connected to MongoDB");
// }).catch(err => {
//     console.error("❌ MongoDB connection error:", err);
// });

// // Set the port from environment or default to 5000
// const port = process.env.PORT || 5000;



// const test = require("./Routes/StudentProfileRouter/StudentProfileRouter");
// const studentProfile = require("./Routes/StudentProfileRouter/StudentProfileRouter");


// app.use("/", test);

// app.use("/api/v1/", studentProfile);




// // Starting the server
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });

const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = express();

// Load environment variables
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

// Database
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("✅ Connected to MongoDB");
}).catch(err => {
    console.error("❌ MongoDB connection error:", err);
});

// Routes
const studentProfile = require("./Routes/StudentProfileRouter/StudentProfileRouter");
app.use("/api/v1", studentProfile);

// Export (for Vercel serverless)
module.exports = app;

// If running locally, start the server
if (require.main === module) {
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
        console.log(`🚀 Server running locally on http://localhost:${port}`);
    });
}