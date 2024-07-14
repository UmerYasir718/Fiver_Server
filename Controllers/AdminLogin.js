const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const OwnerData = require("../Models/OwnerRegistration");
const bcrypt = require("bcrypt");
const AdminEmail = process.env.AdminEmail;
const AdminPassword = process.env.AdminPassword;
module.exports.AdminLogin = async (req, res) => {
  try {
    const { adminEmail, adminPassword } = req.body;

    // Simple validation, ensure all fields are provided
    if (!adminEmail || !adminPassword) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }

    const checkEmail = adminEmail === AdminEmail;
    if (!checkEmail) {
      // Owner with the provided email does not exist, return an error response
      return res
        .status(400)
        .json({ success: false, message: "Account not exists" });
    }
    const checkPassword = adminPassword === AdminPassword;

    const adminData = { adminEmail };
    if (!checkPassword) {
      // Owner with the provided email does not exist, return an error response
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    } else {
      const adminToken = jwt.sign({ adminData }, process.env.AdminSecretKey, {
        expiresIn: "1h",
      });
      res.cookie("adminToken", adminToken, { httpOnly: true });
      res.json({
        success: true,
        adminToken,
        message: "Login successful",
        adminData,
      });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
