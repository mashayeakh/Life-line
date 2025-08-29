const mongoose = require("mongoose");
const StudentProfileModel = require("../../Model/StudentProfileModel/StudentProfileModel");

const searchStudents = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({
                success: false,
                message: "Query parameter is required. Use ?query=yourSearchText"
            });
        }

        // Search conditions
        const searchCondition = [
            { studentName: { $regex: query, $options: "i" } }, // case-insensitive
            { email: { $regex: query, $options: "i" } },
            { mobileNumber: { $regex: query } }
        ];

        // Include _id only if query is a valid ObjectId
        if (mongoose.Types.ObjectId.isValid(query)) {
            searchCondition.push({ _id: query });
        }

        const students = await StudentProfileModel.find({ $or: searchCondition });

        res.status(200).json({
            success: true,
            message: `${students.length} student(s) found`,
            data: students
        });
    } catch (error) {
        console.error("Error searching students:", error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

module.exports = { searchStudents };
