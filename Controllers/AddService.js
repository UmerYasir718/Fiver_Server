const express = require("express");
const cors = require("cors");
const router = express.Router();
const AddService = require("../Models/AddService");
const cloudinary = require("../Cloudinary/Cloudinary");
module.exports.AddService = async (req, res) => {
  try {
    const {
      ownerName,
      ownerImage,
      serviceName,
      serviceContact,
      servicePrice,
      serviceType,
      serviceDescription,
    } = req.body;
    // console.log(page);
    // Simple validation, ensure all fields are provided
    if (
      !ownerName ||
      !serviceName ||
      !serviceContact ||
      !servicePrice ||
      !serviceType ||
      !serviceDescription
    ) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const uploadedImage = req.files.image;
    if (!uploadedImage) {
      return res.status(400).send("No Picture uploaded.");
    }
    console.log(uploadedImage);
    const img = await cloudinary.uploader.upload(uploadedImage.tempFilePath);

    const imageUrl = img.url;
    let picture = await AddService.create({
      ownerName: ownerName,
      ownerImage: ownerImage,
      serviceName: serviceName,
      servicePrice: servicePrice,
      serviceContact: serviceContact,
      serviceType: serviceType,
      serviceDescription: serviceDescription,
      image: imageUrl,
    });
    res.send(picture);
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.DeleteService = async (req, res) => {
  const serviceId = req.params.id;

  try {
    await AddService.findByIdAndDelete(serviceId);
    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    res.json({ error: "Error deleting item" });
  }
};
