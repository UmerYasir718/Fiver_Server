const AddService = require("../Models/AddService");
module.exports.FindService = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    // Use the countryName parameter to filter data in the MongoDB collection
    const data = await AddService.findOne({ _id: id });
    if (!data) {
      res.status(404).json({ error: "Hostel not found" });
      return;
    }

    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
