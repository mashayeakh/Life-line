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

// const express = require('express');
// const cors = require('cors');
// const dotenv = require("dotenv");
// const mongoose = require("mongoose");

// const app = express();

// // Load environment variables
// dotenv.config();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Database
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log("✅ Connected to MongoDB");
// }).catch(err => {
//     console.error("❌ MongoDB connection error:", err);
// });

// // Routes
// const studentProfile = require("../Routes/StudentProfileRouter/StudentProfileRouter");
// app.use("/api/v1", studentProfile);

// // Export (for Vercel serverless)
// module.exports = app;

// // If running locally, start the server
// if (require.main === module) {
//     const port = process.env.PORT || 5000;
//     app.listen(port, () => {
//         console.log(`🚀 Server running locally on http://localhost:${port}`);
//     });
// }

// api/index.js
const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("✅ Connected to MongoDB Atlas"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

// Import your Student model
const Student = require('../Model/StudenProfileModel/StudentProfileModel');

// const Student = require("../Model/StudentProfileModel/StudentProfileModel");
const studentProfile = require("../Routes/StudentProfileRouter/StudentProfileRouter");


// Insert a sample student if none exist
(async () => {
    try {
        const doc = await Student.findOne({});
        if (!doc) {
            await Student.create({
                studentName: "John Doe",
                fathersName: "Richard Doe",
                mothersName: "Mary Doe",
                dateOfBirth: new Date("2000-01-01"),
                gender: "Male",
                email: "john.doe@example.com",
                mobileNumber: "01712345678",
                mode: "Online",
                offlineCourseAccess: "Lab Access",
                courseDuration: "3 months",
                session: "Morning",
                admissionDate: new Date(),
                batchNumber: "B001",
                courseFee: 5000,
                due: 0,
                paymentStatus: "Paid",
                marks: 90,
                grade: "A",
                status: "Active",
                imageUrl: "uploads/test.jpg"
            });
            console.log("Inserted sample student");
        }
    } catch (err) {
        console.error("Error checking/inserting student:", err);
    }
})();

// Routes
app.use("/api/v1", studentProfile);

// Export for Vercel
module.exports = app;

// Local server
if (require.main === module) {
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
        console.log(`🚀 Server running locally on http://localhost:${port}`);
    });
}
