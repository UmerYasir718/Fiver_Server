const mongoose = require("mongoose");
const PaymentSchema = new mongoose.Schema({
  ownerName: String,
  cardName: String,
  cardNumber: String,
});
module.exports = mongoose.model("OwnerPayment", PaymentSchema);
