const mongoose = require("mongoose");
const AddServiceSchema = new mongoose.Schema({
  ownerName: String,
  ownerImage: String,
  serviceName: String,
  servicePrice: String,
  serviceContact: String,
  serviceType: String,
  serviceDescription: String,
  image: String,
});
module.exports = mongoose.model("AddService", AddServiceSchema);
