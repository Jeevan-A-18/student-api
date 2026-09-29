import mongoose from "mongoose";
import Student from "../models/Student.js";

// @desc    Get all students (with search, filter, pagination)
// @route   GET /api/students
export const getAllStudents = async (req, res, next) => {
  try {
    const { search, department, page = 1, limit = 10 } = req.query;

    // Build a filter object
    const filter = {};

    // Search by name (case-insensitive partial match)
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    // Filter by department (exact match)
    if (department) {
      filter.department = department;
    }

    // Convert page and limit to numbers
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;
    const skip = (pageNum - 1) * limitNum;

    // Get total count for pagination metadata
    const totalStudents = await Student.countDocuments(filter);
    const totalPages = Math.ceil(totalStudents / limitNum);

    // Fetch students sorted by newest first
    const students = await Student.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    res.status(200).json({
      success: true,
      count: students.length,
      totalStudents,
      currentPage: pageNum,
      totalPages,
      data: students,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single student by ID
// @route   GET /api/students/:id
export const getStudentById = async (req, res, next) => {
  try {
    // Validate the MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid student ID format",
      });
    }

    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new student
// @route   POST /api/students
export const createStudent = async (req, res, next) => {
  try {
    const { rollNo, email } = req.body;

    // Check for duplicate rollNo
    const existingRollNo = await Student.findOne({ rollNo });
    if (existingRollNo) {
      return res.status(409).json({
        success: false,
        message: `A student with roll number ${rollNo} already exists`,
      });
    }

    // Check for duplicate email
    const existingEmail = await Student.findOne({
      email: email?.toLowerCase(),
    });
    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: `A student with email ${email} already exists`,
      });
    }

    const student = await Student.create(req.body);

    res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a student by ID
// @route   PUT /api/students/:id
export const updateStudent = async (req, res, next) => {
  try {
    // Validate the MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid student ID format",
      });
    }

    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a student by ID
// @route   DELETE /api/students/:id
export const deleteStudent = async (req, res, next) => {
  try {
    // Validate the MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid student ID format",
      });
    }

    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
