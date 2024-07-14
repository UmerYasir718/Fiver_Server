const GetService = require("../Models/AddService");
module.exports.GetService = async (req, res) => {
  try {
    const service = await GetService.find();
    res.json(service);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
