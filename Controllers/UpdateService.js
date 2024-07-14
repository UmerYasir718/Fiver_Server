const express = require("express");
const cors = require("cors");
const router = express.Router();
// const addHostel = require("../Models/AddHostel");
const cloudinary = require("../Cloudinary/Cloudinary");
const GetService = require("../Models/AddService");
module.exports.UpdateService = async (req, res) => {
  const { serviceName, serviceContact, servicePrice, serviceDescription } =
    req.body;
  if (!serviceName || !serviceContact || !servicePrice || !serviceDescription) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }
  const updateService = req.params.id;
  try {
    await GetService.findByIdAndUpdate(
      updateService,
      {
        serviceName,
        serviceContact,
        servicePrice,
        serviceDescription,
      },
      { new: true }
    );

    if (!updateService) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.json({ message: "Service updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
