const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
  createBudget,
  getBudgets,
  deleteBudget,
} = require("../controllers/budgetController");

router.post("/", auth, createBudget);
router.get("/", auth, getBudgets);
router.delete("/:id", auth, deleteBudget);

module.exports = router;