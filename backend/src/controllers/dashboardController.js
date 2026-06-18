const pool = require("../config/db");

const getSummary = async (req, res) => {
  try {
    const income = await pool.query(
      `SELECT COALESCE(SUM(amount),0) total
       FROM transactions
       WHERE user_id=$1
       AND type='income'`,
      [req.user.id]
    );

    const expense = await pool.query(
      `SELECT COALESCE(SUM(amount),0) total
       FROM transactions
       WHERE user_id=$1
       AND type='expense'`,
      [req.user.id]
    );

    const totalIncome =
      Number(income.rows[0].total);

    const totalExpense =
      Number(expense.rows[0].total);

    res.json({
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error"
    });
  }
};

module.exports = {
  getSummary
};