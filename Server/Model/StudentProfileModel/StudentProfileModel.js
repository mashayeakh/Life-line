// const mongoose = require("mongoose");

// const studentSchema = new mongoose.Schema({
//     studentName: {
//         type: String,
//         required: [true, "Student Name is required"],
//         trim: true
//     },
//     fathersName: {
//         type: String,
//         required: [true, "Father's Name is required"],
//         trim: true
//     },
//     mothersName: {
//         type: String,
//         required: [true, "Mother's Name is required"],
//         trim: true
//     },
//     dateOfBirth: {
//         type: Date,
//         required: [true, "Date of Birth is required"]
//     },
//     gender: {
//         type: String,
//         required: [true, "Gender is required"],
//         enum: ["Male", "Female", "Other"]
//     },
//     email: {
//         type: String,
//         required: [true, "Email is required"],
//         unique: true,
//         lowercase: true,
//         match: [/\S+@\S+\.\S+/, "Please provide a valid email address"]
//     },
//     mobileNumber: {
//         type: String,
//         required: [true, "Mobile Number is required"],
//         match: [/^\d{11}$/, "Mobile Number must be exactly 11 digits"]
//     },
//     mode: {
//         type: String,
//         enum: ["Online", "Offline"],
//         default: "Offline"
//     },
//     offlineCourseAccess: {
//         type: String,
//         enum: ["Lab Access", "Library Access"],
//         required: function () { return this.mode === "Offline"; }
//     },
//     courseDuration: {
//         type: String,
//         enum: ["3 months", "6 months"],
//         required: function () { return this.mode === "Offline"; }
//     },
//     session: {
//         type: String,
//         enum: ["Morning", "Evening"],
//         required: function () { return this.mode === "Offline"; }
//     },
//     admissionDate: {
//         type: Date,
//         required: function () { return this.mode === "Offline"; }
//     },
//     batchNumber: {
//         type: String
//     },
//     courseFee: {
//         type: Number,
//         required: [true, "Course Fee is required"],
//         min: [0, "Course Fee cannot be negative"]
//     },
//     due: {
//         type: Number,
//         default: 0,
//         min: [0, "Due amount cannot be negative"]
//     },
//     paymentStatus: {
//         type: String,
//         enum: ["Paid", "Pending"],
//         default: "Pending"
//     },
//     marks: {
//         type: Number,
//         min: 0
//     },
//     grade: {
//         type: String,
//         trim: true
//     },
//     certificateIssueDate: {
//         type: Date
//     },
//     status: {
//         type: String,
//         enum: ["Active", "Inactive"],
//         default: "Active"
//     },
//     imageUrl: {
//         type: String,
//         trim: true
//     }
// }, { timestamps: true });

// module.exports = mongoose.model("StudentProfile", studentSchema);

const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    // Common fields
    studentName: {
        type: String,
        required: [true, "Student Name is required"],
        trim: true
    },
    fathersName: {
        type: String,
        required: [true, "Father's Name is required"],
        trim: true
    },
    mothersName: {
        type: String,
        required: [true, "Mother's Name is required"],
        trim: true
    },
    dateOfBirth: {
        type: Date,
        required: [true, "Date of Birth is required"]
    },
    gender: {
        type: String,
        required: [true, "Gender is required"],
        enum: ["Male", "Female", "Other"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "Please provide a valid email address"]
    },
    mobileNumber: {
        type: String,
        required: [true, "Mobile Number is required"],
        match: [/^\d{11}$/, "Mobile Number must be exactly 11 digits"]
    },
    marks: {
        type: Number,
        min: 0
    },
    grade: {
        type: String,
        trim: true
    },
    certificateIssueDate: {
        type: Date
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active"
    },
    imageUrl: {
        type: String,
        trim: true
    },

    // Mode field
    mode: {
        type: String,
        enum: ["Online", "Offline"],
        required: [true, "Mode is required"],
        set: v => v.charAt(0).toUpperCase() + v.slice(1).toLowerCase()
    },

    // Offline-specific fields
    offlineCourseAccess: {
        type: String,
        enum: ["Lab Access", "Library Access"],
        required: function () { return this.mode === "Offline"; }
    },
    offlineCourseDuration: {
        type: String,
        enum: ["3 months", "6 months", "12 months"],
        required: function () { return this.mode === "Offline"; }
    },
    offlineSession: {
        type: String,
        enum: ["Morning", "Evening", "Night"],
        required: function () { return this.mode === "Offline"; }
    },
    admissionDate: {
        type: Date,
        required: function () { return this.mode === "Offline"; }
    },
    batchNumber: {
        type: String,
        required: function () { return this.mode === "Offline"; }
    },
    courseFee: {
        type: Number,
        required: function () { return this.mode === "Offline"; },
        min: [0, "Course Fee cannot be negative"]
    },
    due: {
        type: Number,
        default: 0,
        min: [0, "Due amount cannot be negative"],
        required: function () { return this.mode === "Offline"; }
    },
    paymentStatus: {
        type: String,
        enum: ["Paid", "Pending"],
        default: "Pending",
        required: function () { return this.mode === "Offline"; }
    },

    // Online-specific fields
    onlineCourseName: {
        type: String,
        enum: ["Web Development", "App Development", "Graphic Design"], // you can adjust
        required: function () { return this.mode === "Online"; }
    },
    onlineCourseDuration: {
        type: String,
        enum: ["1 month", "3 months", "6 months"],
        required: function () { return this.mode === "Online"; }
    },
    onlineSession: {
        type: String,
        enum: ["Morning", "Evening", "Weekend"],
        required: function () { return this.mode === "Online"; }
    }

}, { timestamps: true });

module.exports = mongoose.model("StudentProfile", studentSchema);
