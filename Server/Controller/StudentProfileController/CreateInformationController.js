const StudentProfileModel = require("../../Model/StudentProfileModel/StudentProfileModel");

const test = async (req, res) => {
    res.send("HOLAAAA");
}

//? ---------------------------------------- OLD ONE ---------------------------------------------------------------------

//create student profile
// const createStudentProfile = async (req, res) => {
//     try {
//         // If a file is uploaded, store its path in imageUrl
//         if (req.file) {
//             req.body.imageUrl = req.file.path; // stores local path
//         }

//         // Create a new student instance with all request data
//         const student = new StudentProfileModel(req.body);

//         // Save to DB
//         const savedStudent = await student.save();

//         // Respond with success
//         res.status(201).json({
//             success: true,
//             message: "Student created successfully",
//             data: savedStudent
//         });
//     } catch (error) {
//         console.error("Error creating student:", error);

//         // Handle Mongoose validation errors
//         if (error.name === "ValidationError") {
//             const messages = Object.values(error.errors).map(val => val.message);
//             return res.status(400).json({
//                 success: false,
//                 message: "Validation Error",
//                 errors: messages
//             });
//         }

//         // Handle duplicate key (e.g., email)
//         if (error.code === 11000) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Duplicate field value entered",
//                 errors: error.keyValue
//             });
//         }

//         // Generic server error
//         res.status(500).json({
//             success: false,
//             message: "Server Error"
//         });
//     }
// };

//? ---------------------------------------- OLD ONE ---------------------------------------------------------------------




//create student profile
const createStudentProfile = async (req, res) => {
    try {
        // If a file is uploaded, store its path in resume or imageUrl
        if (req.file) {
            if (req.file.fieldname === "resume") {
                req.body.resume = req.file.path; // resume file
            } else if (req.file.fieldname === "profileImage") {
                req.body.imageUrl = req.file.path; // profile image
            }
        }

        // Parse arrays/objects if they come as JSON strings from Postman
        const parseIfJson = (field) => {
            try {
                return typeof field === "string" ? JSON.parse(field) : field;
            } catch {
                return field;
            }
        };

        req.body.education = parseIfJson(req.body.education);
        req.body.experience = parseIfJson(req.body.experience);
        req.body.skills = parseIfJson(req.body.skills);
        req.body.certificates = parseIfJson(req.body.certificates);
        req.body.socialLinks = parseIfJson(req.body.socialLinks);

        // Profile completion logic (simple version: check required fields)
        const isProfileComplete =
            req.body.name &&
            req.body.email &&
            req.body.location &&
            req.body.university &&
            req.body.skills?.length > 0 &&
            req.body.education?.length > 0 &&
            req.body.experience?.length > 0;

        req.body.isProfileComplete = isProfileComplete;

        // Create a new student instance
        const student = new StudentProfileModel(req.body);

        // Save to DB
        const savedStudent = await student.save();

        res.status(201).json({
            success: true,
            message: "Student profile created successfully",
            data: savedStudent
        });

    } catch (error) {
        console.error("Error creating student:", error);

        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                message: "Validation Error",
                errors: messages
            });
        }

        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Duplicate field value entered",
                errors: error.keyValue
            });
        }

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};






// Get all student profiles
const getAllStudents = async (req, res) => {
    try {
        const students = await StudentProfileModel.find();
        res.status(200).json({
            success: true,
            message: "All students fetched successfully",
            count: students.length,
            data: students
        });
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

//Get students filtered by mode (Online/Offline)
const getStudentsByMode = async (req, res) => {
    try {
        const { mode } = req.query;

        // Validate mode
        if (!mode || !["Online", "Offline"].includes(mode.charAt(0).toUpperCase() + mode.slice(1).toLowerCase())) {
            return res.status(400).json({
                success: false,
                message: "Invalid or missing 'mode' query parameter. Must be 'Online' or 'Offline'."
            });
        }
        const normalizedMode = mode.charAt(0).toUpperCase() + mode.slice(1).toLowerCase();

        const students = await StudentProfileModel.find({ mode: normalizedMode });
        res.status(200).json({
            success: true,
            message: `Students with mode = ${mode} fetched successfully`,
            count: students.length,
            data: students
        });
    } catch (error) {
        console.error("Error fetching students by mode:", error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};



module.exports = { test, createStudentProfile, getAllStudents, getStudentsByMode }