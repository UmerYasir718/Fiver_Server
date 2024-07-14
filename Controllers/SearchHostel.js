const GetHostel = require("../Models/AddHostel");
module.exports.SearchHostel = async (req, res) => {
  try {
    const { rentFrom, rentTo } = req.body;
    console.log(req.body);
    let hostels = await GetHostel.find();
    console.log(hostels);
    hostels = hostels.filter((hostel) => {
      return (
        hostel.hostelPrice >= parseInt(rentFrom) &&
        hostel.hostelPrice <= parseInt(rentTo)
      );
    });
    res.json({ success: true, hostels });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
