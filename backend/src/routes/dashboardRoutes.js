const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");


const {
  getSummary,
  getBudgetStatus,
  getAnalytics,
  getMonthlyReport,
} = require("../controllers/dashboardController");

router.get("/summary", auth, getSummary);
router.get("/analytics", auth, getAnalytics);
router.get("/budget-status", auth, getBudgetStatus);

module.exports = router;
