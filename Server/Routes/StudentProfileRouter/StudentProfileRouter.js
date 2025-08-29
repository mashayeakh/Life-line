const express = require("express");
const { test, createStudentProfile, getAllStudents, getStudentsByMode } = require("../../Controller/StudentProfileController/CreateInformationController");
const router = express.Router();
const multer = require("multer");
const { searchStudents } = require("../../Controller/StudentProfileController/FilteringInformationController");

// Configure storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // folder to store uploaded files
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + "-" + file.originalname);
    }
});

const upload = multer({ storage: storage });


router.get("/", test);
// router.post("/students", upload.single("image"), createStudentProfile);
router.post("/students", upload.single("profileImage"), createStudentProfile);
router.get("/students", getAllStudents);
// /students/mode ? mode = Online or / students / mode ? mode = Offline
router.get("/students/mode", getStudentsByMode);

//serarch 
router.get("/students/search", searchStudents);


module.exports = router;

