const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { jwtDecode } = require("jwt-decode");
const cookieParser = require("cookie-parser");
const router = express.Router();
const secretKey = process.env.UserSecretKey;
router.use(cors());
router.use(express.json());
router.use(cookieParser());
// Verify userToken route
router.get("/userVerify", (req, res) => {
  const authHeader = req.headers["authorization"];
  const userToken = authHeader && authHeader.split(" ")[1];
  // const authHeader = req.headers["authorization"];

  if (!userToken) {
    return res.status(401).json({ success: false, message: "Token not Found" });
  }

  jwt.verify(userToken, secretKey, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ success: false, message: "TimeOut Please Login Again" });
    }
    const userData = jwtDecode(userToken);
    console.log(userData);
    // Token is valid
    res.json({ success: true, userData });
  });
});
module.exports = router;

// function authVerfiy(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   const userToken = authHeader && authHeader.split(" ")[1];
//   if (userToken == undefined) {
//     return res.sendStatus(401);
//   } else {
//     jwt.verify(userToken, process.env.PRIVATE_KEY, (err, email) => {
//       if (err) return res.sendStatus(403);
//       req.user = email;
//       next();
//     });
//   }
// }
