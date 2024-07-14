const Service = require("../Models/AddService");
module.exports.TotalServices = async (req, res) => {
  try {
    const service = await Service.countDocuments();
    res.json(service);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
