import express from "express";
import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController.js";

const router = express.Router();

// GET  /api/students      → Get all students (supports search, filter, pagination)
// POST /api/students      → Create a new student
router.route("/").get(getAllStudents).post(createStudent);

// GET    /api/students/:id → Get a single student
// PUT    /api/students/:id → Update a student
// DELETE /api/students/:id → Delete a student
router.route("/:id").get(getStudentById).put(updateStudent).delete(deleteStudent);

export default router;
