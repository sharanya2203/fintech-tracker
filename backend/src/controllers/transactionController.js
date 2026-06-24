const pool = require("../config/db");

const addTransaction = async (req, res) => {
  try {
    const { amount, type, category, description } = req.body;

    const transaction = await pool.query(
      `INSERT INTO transactions
      (user_id, amount, type, category, description)
      VALUES($1,$2,$3,$4,$5)
      RETURNING *`,
      [
        req.user.id,
        amount,
        type,
        category,
        description,
      ]
    );

    res.status(201).json(transaction.rows[0]);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getTransactions = async (req, res) => {
  try {
    const transactions = await pool.query(
      `SELECT *
       FROM transactions
       WHERE user_id=$1
       ORDER BY id DESC`,
      [req.user.id]
    );

    res.json(transactions.rows);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getRecentTransactions = async (req, res) => {
  try {
    const transactions = await pool.query(
      `SELECT *
       FROM transactions
       WHERE user_id=$1
       ORDER BY id DESC
       LIMIT 5`,
      [req.user.id]
    );

    res.json(transactions.rows);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const { amount, type, category, description } = req.body;

    const transaction = await pool.query(
      `UPDATE transactions
       SET amount=$1,
           type=$2,
           category=$3,
           description=$4
       WHERE id=$5
       AND user_id=$6
       RETURNING *`,
      [
        amount,
        type,
        category,
        description,
        req.params.id,
        req.user.id,
      ]
    );

    res.json(transaction.rows[0]);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      `DELETE FROM transactions
       WHERE id=$1
       AND user_id=$2`,
      [id, req.user.id]
    );

    res.json({
      message: "Transaction Deleted",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  addTransaction,
  getTransactions,
  getRecentTransactions,
  updateTransaction,
  deleteTransaction,
};