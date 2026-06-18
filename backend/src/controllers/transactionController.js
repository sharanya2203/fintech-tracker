const pool = require("../config/db");

const addTransaction = async (req, res) => {
  try {
    const { amount, type, category, description } = req.body;

    const transaction = await pool.query(
      `INSERT INTO transactions
      (user_id,amount,type,category,description)
      VALUES($1,$2,$3,$4,$5)
      RETURNING *`,
      [
        req.user.id,
        amount,
        type,
        category,
        description
      ]
    );

    res.status(201).json(transaction.rows[0]);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
};

const getTransactions = async (req, res) => {
  try {

    const transactions = await pool.query(
      `SELECT * FROM transactions
       WHERE user_id=$1
       ORDER BY id DESC`,
      [req.user.id]
    );

    res.json(transactions.rows);

  } catch (error) {
    res.status(500).json({
      message: "Server Error"
    });
  }
};

module.exports = {
  addTransaction,
  getTransactions
};