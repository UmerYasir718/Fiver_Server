const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { jwtDecode } = require("jwt-decode");
const cookieParser = require("cookie-parser");
const router = express.Router();
const ownerSecretKey = process.env.OwnerSecretKey;
router.use(cors());
router.use(express.json());
router.use(cookieParser());
// Verify ownerToken route
router.get("/ownerVerify", (req, res) => {
  const authHeader = req.headers["authorization"];
  const ownerToken = authHeader && authHeader.split(" ")[1];

  if (!ownerToken) {
    return res.status(401).json({ success: false, message: "Token not Found" });
  }

  jwt.verify(ownerToken, ownerSecretKey, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ success: false, message: "TimeOut Please Login Again" });
    }
    const ownerData = jwtDecode(ownerToken);
    res.json({ success: true, ownerData });
  });
});
module.exports = router;
