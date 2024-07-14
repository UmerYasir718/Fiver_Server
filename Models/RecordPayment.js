const mongoose = require("mongoose");
const RecordPaymentSchema = new mongoose.Schema({
  ownerName: String,
  serviceName: String,
  servicePrice: String,
  flag: Boolean,
  timestamp: String,
});
module.exports = mongoose.model("RecordPayment", RecordPaymentSchema);
