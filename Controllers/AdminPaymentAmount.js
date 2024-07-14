const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");

const app = express();
const stripe = Stripe(process.env.STRIPE_kEY);

app.use(cors());

// Endpoint to get balance
module.exports.AdminPaymentAmount = async (req, res) => {
  try {
    const balance = await stripe.balance.retrieve();
    res.json(balance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Endpoint to get transactions
module.exports.AdminTransactionHistory = async (req, res) => {
  try {
    const transactions = await stripe.balanceTransactions.list({
      limit: 10, // You can adjust the limit as needed
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
