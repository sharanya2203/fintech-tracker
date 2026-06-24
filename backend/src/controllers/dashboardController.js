const pool = require("../config/db");

const getSummary = async (req, res) => {
  try {
    const income = await pool.query(
      `SELECT COALESCE(SUM(amount),0) as total
       FROM transactions
       WHERE user_id=$1 AND type='income'`,
      [req.user.id]
    );

    const expense = await pool.query(
      `SELECT COALESCE(SUM(amount),0) as total
       FROM transactions
       WHERE user_id=$1 AND type='expense'`,
      [req.user.id]
    );

    const totalIncome = Number(income.rows[0].total);
    const totalExpense = Number(expense.rows[0].total);

    res.json({
      income: totalIncome,
      expense: totalExpense,
      balance: totalIncome - totalExpense,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getAnalytics = async (req, res) => {
  try {
    const transactions = await pool.query(
      `SELECT * FROM transactions
       WHERE user_id=$1`,
      [req.user.id]
    );

    const data = transactions.rows;

    const totalTransactions = data.length;

    const totalIncome = data
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const totalExpense = data
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const categoryTotals = {};

    data
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        categoryTotals[t.category] =
          (categoryTotals[t.category] || 0) +
          Number(t.amount);
      });

    let highestCategory = "None";
    let highestAmount = 0;

    for (const category in categoryTotals) {
      if (categoryTotals[category] > highestAmount) {
        highestAmount = categoryTotals[category];
        highestCategory = category;
      }
    }

    res.json({
      totalTransactions,
      totalIncome,
      totalExpense,
      highestCategory,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getBudgetStatus = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT
        b.id,
        b.category,
        b.monthly_limit,
        COALESCE(
          SUM(
            CASE
              WHEN t.type='expense'
              THEN t.amount
              ELSE 0
            END
          ),0
        ) AS spent
      FROM budgets b
      LEFT JOIN transactions t
      ON b.category = t.category
      AND b.user_id = t.user_id
      WHERE b.user_id=$1
      GROUP BY b.id
      `,
      [req.user.id]
    );

    const budgets = result.rows.map((b) => ({
      id: b.id,
      category: b.category,
      budget: Number(b.monthly_limit),
      spent: Number(b.spent),
      remaining:
        Number(b.monthly_limit) - Number(b.spent),
    }));

    res.json(budgets);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


module.exports = {
  getSummary,
  getBudgetStatus,
  getAnalytics,
};