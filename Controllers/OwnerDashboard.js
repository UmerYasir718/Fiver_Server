const express = require("express");
const router = express.Router();
// const BookingData = require("../Models/BookingService");
const Service = require("../Models/AddService");
module.exports.DashBoardOwner = async (req, res) => {
  try {
    const { ownerName } = req.body;
    console.log(req.body);
    const filteredServices = await Service.countDocuments({ owner: ownerName });
    res.json({ filteredServices });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
