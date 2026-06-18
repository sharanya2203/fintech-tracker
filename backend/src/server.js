const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const transactionRoutes =
require("./routes/transactionRoutes");
require("dotenv").config();
const budgetRoutes =
require("./routes/budgetRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use(
  "/api/transactions",
  transactionRoutes
);
app.use("/api/budgets", budgetRoutes);

app.get("/", (req, res) => {
  res.send("FinTech Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});