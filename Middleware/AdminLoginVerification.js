const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { jwtDecode } = require("jwt-decode");
const cookieParser = require("cookie-parser");
const router = express.Router();
const adminSecretKey = process.env.AdminSecretKey;
router.use(cors());
router.use(express.json());
router.use(cookieParser());
// Verify adminToken route
router.get("/adminVerify", (req, res) => {
  const authHeader = req.headers["authorization"];
  const adminToken = authHeader && authHeader.split(" ")[1];

  if (!adminToken) {
    return res.status(401).json({ success: false, message: "Token not Found" });
  }

  jwt.verify(adminToken, adminSecretKey, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ success: false, message: "TimeOut Please Login Again" });
    }
    const adminData = jwtDecode(adminToken);
    res.json({ success: true, adminData });
  });
});
module.exports = router;
