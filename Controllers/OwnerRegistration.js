const ownerData = require("../Models/OwnerRegistration");
const cloudinary = require("../Cloudinary/Cloudinary");
module.exports.OwnerRegistration = async (req, res) => {
  try {
    const { ownerName, ownerEmail, ownerPassword } = req.body;

    // Simple validation, ensure all fields are provided
    if (!ownerEmail || !ownerPassword || !ownerName) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }
    const OwnerNameUnique = await ownerData.findOne({ ownerName: ownerName });
    if (OwnerNameUnique) {
      // Owner already exists, return an error response
      return res
        .status(400)
        .json({ success: false, message: "OwnerName already exits" });
    }
    const existingOwner = await ownerData.findOne({ ownerEmail: ownerEmail });

    if (existingOwner) {
      // Email already exists, return an error response
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }
    const uploadedImage = req.files.ownerImage;
    if (!uploadedImage) {
      return res.status(400).send("No file uploaded.");
    }
    console.log(uploadedImage);
    const img = await cloudinary.uploader.upload(uploadedImage.tempFilePath);
    let newOwner = await ownerData.create({
      ownerName: ownerName,
      ownerImage: img.url,
      ownerEmail: ownerEmail,
      ownerPassword: ownerPassword,
    });
    console.log(newOwner);
    res.json({
      success: true,
      message: "Account Created successful",
      newOwner,
    });
  } catch (error) {
    console.error("Error creating Owner:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
