const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const budgetRoutes = require("./routes/budgetRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ===== Request Logger =====
app.use((req, res, next) => {
  console.log("==================================");
  console.log("REQUEST:", req.method, req.originalUrl);
  console.log("HEADERS:", req.headers);

  if (req.body && Object.keys(req.body).length > 0) {
    console.log("BODY:", req.body);
  }

  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("FinTech Backend Running");
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("==================================");
  console.error("SERVER ERROR");
  console.error(err);
  console.error("==================================");

  res.status(500).json({
    message: "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Prevent server crash
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION");
  console.error(err);
});

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION");
  console.error(err);
});