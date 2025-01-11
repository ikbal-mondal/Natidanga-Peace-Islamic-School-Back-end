const express = require("express");
const { addTeacher, getTeachers, updateTeacher, deleteTeacher } = require("../controllers/teacherController");
const router = express.Router();

router.post("/", addTeacher);
router.get("/", getTeachers);
router.put("/:id", updateTeacher);
router.delete("/:id", deleteTeacher);

module.exports = router;
