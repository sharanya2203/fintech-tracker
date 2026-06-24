const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
  addTransaction,
  getTransactions,
  getRecentTransactions,
  updateTransaction,
  deleteTransaction
} = require("../controllers/transactionController");

router.post("/", auth, addTransaction);
router.put("/:id", auth, updateTransaction);

router.get("/recent", auth, getRecentTransactions);

router.get("/", auth, getTransactions);

router.delete("/:id", auth, deleteTransaction);

module.exports = router;