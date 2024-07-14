const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const UserData = require("../Models/UserRegistration");
const OwnerData = require("../Models/OwnerRegistration");
const bcrypt = require("bcrypt");
const sendBookingEmail = require("./EmailSender");
module.exports.UserForgetPassword = async (req, res) => {
  try {
    const { userEmail } = req.body;

    // Simple validation, ensure all fields are provided
    if (!userEmail) {
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
      const id = existingUser._id;
      const token = jwt.sign({ id }, process.env.UserSecretKey, {
        expiresIn: "5M",
      });
      //   res.cookie("token", token, { httpOnly: true });
      const subject = `Reset Password of Fiver `;
      const resetLink = `http://localhost:3000/UserReset-Password/${id}/${token}`;
      const body = `
Dear ${existingUser.userName},
This email is to reset your password for your Fiver account.
Click on the link below to reset your password. This link is valid for 5 minutes:
${resetLink}
If you have any questions, please don't hesitate to contact us.
Thanks,
The Fiver Team
`;

      existingUser
        ? sendBookingEmail(existingUser.userEmail, subject, body)
        : console.log("Hostel is Not Booking");
      res.json({
        success: true,
        token,
        message: "Reset Link Send Successfully to Email address",
      });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports.OwnerForgetPassword = async (req, res) => {
  try {
    const { ownerEmail } = req.body;

    // Simple validation, ensure all fields are provided
    if (!ownerEmail) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }
    // Check if the user with the provided email exists
    const existingOwner = await OwnerData.findOne({ ownerEmail: ownerEmail });

    if (!existingOwner) {
      // User with the provided email does not exist, return an error response
      return res
        .status(400)
        .json({ success: false, message: "Account not exists" });
    }
    if (existingOwner) {
      const id = existingOwner._id;
      const token = jwt.sign({ id }, process.env.OwnerSecretKey, {
        expiresIn: "5M",
      });
      //   res.cookie("token", token, { httpOnly: true });
      const subject = `Reset Password of Fiver Owner`;
      const resetLink = `http://localhost:3000/OwnerReset-Password/${id}/${token}`;
      const body = `
Dear ${existingOwner.ownerName},
This email is to reset your password for your Fiver account.
Click on the link below to reset your password. This link is valid for 5 minutes:
${resetLink}
If you have any questions, please don't hesitate to contact us.
Thanks,
The Fiver Team
`;

      existingOwner
        ? sendBookingEmail(existingOwner.ownerEmail, subject, body)
        : console.log("Hostel is Not Booking");
      res.json({
        success: true,
        token,
        message: "Reset Link Send Successfully to Email address",
      });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
