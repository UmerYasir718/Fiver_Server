const express = require("express");
const cors = require("cors");
const router = express.Router();
router.use(cors());
const { AdminLogin } = require("../Controllers/AdminLogin");
const { AdminPaymentAmount } = require("../Controllers/AdminPaymentAmount");
const { TotalServices } = require("../Controllers/AdminDashboard");
const {
  AdminTransactionHistory,
} = require("../Controllers/AdminPaymentAmount");
const { UpdatePaymentStatus } = require("../Controllers/Payment");
router.post("/adminLogin", AdminLogin);
router.get("/api/balance", AdminPaymentAmount);
router.get("/totalServices", TotalServices);
router.get("/api/transactions", AdminTransactionHistory);
router.put("/updatePaymentStatus/:id", UpdatePaymentStatus);
module.exports = router;
