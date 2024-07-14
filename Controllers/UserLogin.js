const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const UserData = require("../Models/UserRegistration");
const bcrypt = require("bcrypt");
module.exports.UserLogin = async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;

    // Simple validation, ensure all fields are provided
    if (!userEmail || !userPassword) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }

    // Check if the user with the provided email exists
    const existingUser = await UserData.findOne({ userEmail: userEmail });

    if (!existingUser) {
      // User with the provided email does not exist, return an error response
      return res
        .status(400)
        .json({ success: false, message: "Account not exists" });
    }
    if (existingUser) {
      const isPasswordMatch = await bcrypt.compare(
        userPassword,
        existingUser.userPassword
      );
      const userName = existingUser.userName;
      const userData = { userEmail, userName };
      if (!isPasswordMatch) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid Credential " });
      } else {
        const userToken = jwt.sign({ userData }, process.env.UserSecretKey, {
          expiresIn: "1h",
        });
        res.cookie("userToken", userToken, { httpOnly: true });
        res.json({
          success: true,
          userToken,
          message: "Login successful",
          userData,
        });
      }
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
