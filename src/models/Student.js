import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    rollNo: {
      type: Number,
      required: [true, "Roll number is required"],
      unique: true,
      min: [1, "Roll number must be at least 1"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name must be at most 50 characters"],
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
      min: [16, "Age must be at least 16"],
      max: [100, "Age must be at most 100"],
    },
    department: {
      type: String,
      required: [true, "Department is required"],
      enum: {
        values: ["CSE", "ISE", "ECE", "EEE", "ME", "CIVIL"],
        message: "Department must be one of: CSE, ISE, ECE, EEE, ME, CIVIL",
      },
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address",
      ],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^\d{10}$/, "Phone number must be exactly 10 digits"],
    },
    cgpa: {
      type: Number,
      required: [true, "CGPA is required"],
      min: [0, "CGPA must be at least 0"],
      max: [10, "CGPA must be at most 10"],
    },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;
