const StudentProfileModel = require("../../Model/StudenProfileModel/StudentProfileModel");

const test = async (req, res) => {
    res.send("HOLAAAA");
}

//create student profile
const createStudentProfile = async (req, res) => {
    try {
        // If a file is uploaded, store its path in imageUrl
        if (req.file) {
            req.body.imageUrl = req.file.path; // stores local path
        }

        // Create a new student instance with all request data
        const student = new StudentProfileModel(req.body);

        // Save to DB
        const savedStudent = await student.save();

        // Respond with success
        res.status(201).json({
            success: true,
            message: "Student created successfully",
            data: savedStudent
        });
    } catch (error) {
        console.error("Error creating student:", error);

        // Handle Mongoose validation errors
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                message: "Validation Error",
                errors: messages
            });
        }

        // Handle duplicate key (e.g., email)
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Duplicate field value entered",
                errors: error.keyValue
            });
        }

        // Generic server error
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

        if (!students || students.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No students found",
                data: []
            });
        }

        res.status(200).json({
            success: true,
            message: "Students retrieved successfully",
            data: students,
            count: students.length
        });
    } catch (error) {
        console.error("Error fetching students:", error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};



module.exports = { test, createStudentProfile, getAllStudents }