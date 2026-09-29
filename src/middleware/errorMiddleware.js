const errorHandler = (err, req, res, next) => {
  console.error(`Error: ${err.message}`);

  // Mongoose Validation Error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((val) => val.message);
    return res.status(400).json({
      success: false,
      message: messages.join(", "),
    });
  }

  // Mongoose Duplicate Key Error (code 11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue).join(", ");
    return res.status(409).json({
      success: false,
      message: `Duplicate value for: ${field}. This value already exists.`,
    });
  }

  // Mongoose Cast Error (invalid ObjectId, etc.)
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: `Invalid value: ${err.value}`,
    });
  }

  // Generic Server Error
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

export default errorHandler;
