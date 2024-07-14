const UserData = require("../Models/UserRegistration");
const OwnerData = require("../Models/OwnerRegistration");
const UserSecretKey = process.env.UserSecretKey;
const OwnerSecretKey = process.env.OwnerSecretKey;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.UserResetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { userPassword } = req.body;
  console.log(req.params);
  try {
    const decoded = jwt.verify(token, UserSecretKey);

    // Token is valid, proceed with password reset
    const hashedPassword = await bcrypt.hash(userPassword, 12);
    const updatedUser = await UserData.findByIdAndUpdate(
      id,
      { userPassword: hashedPassword },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token expired" });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};
module.exports.OwnerResetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { ownerPassword } = req.body;
  console.log(req.params);
  try {
    const decoded = jwt.verify(token, OwnerSecretKey);

    // Token is valid, proceed with password reset
    const hashedPassword = await bcrypt.hash(ownerPassword, 12);
    const updatedUser = await OwnerData.findByIdAndUpdate(
      id,
      { ownerPassword: hashedPassword },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token expired" });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};
