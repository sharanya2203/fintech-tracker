const pool = require("../config/db");

const createBudget = async (req, res) => {
  try {
    const { category, monthly_limit } = req.body;

    const budget = await pool.query(
      `INSERT INTO budgets
       (user_id, category, monthly_limit)
       VALUES($1,$2,$3)
       RETURNING *`,
      [req.user.id, category, monthly_limit]
    );

    res.status(201).json(budget.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
};

const getBudgets = async (req, res) => {
  try {
    const budgets = await pool.query(
      "SELECT * FROM budgets WHERE user_id=$1",
      [req.user.id]
    );

    res.json(budgets.rows);
  } catch (error) {
    res.status(500).json({
      message: "Server Error"
    });
  }
};

module.exports = {
  createBudget,
  getBudgets
};