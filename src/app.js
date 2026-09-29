import express from "express";
import cors from "cors";
import studentRoutes from "./routes/studentRoutes.js";
import logger from "./middleware/loggerMiddleware.js";
import notFound from "./middleware/notFoundMiddleware.js";
import errorHandler from "./middleware/errorMiddleware.js";

const app = express();

// ─── Global Middleware ──────────────────────────────────
app.use(express.json());
app.use(cors());
app.use(logger);

// ─── Root Route ─────────────────────────────────────────
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Student Management API is running",
    version: "1.0.0",
  });
});

// ─── API Routes ─────────────────────────────────────────
app.use("/api/students", studentRoutes);

// ─── Not Found Middleware (must come after all routes) ──
app.use(notFound);

// ─── Global Error Handler (must be the last middleware) ─
app.use(errorHandler);

export default app;
