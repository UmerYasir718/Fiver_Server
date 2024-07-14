const mongoose = require("mongoose");
const BookingSchema = new mongoose.Schema({
  userName: String,
  userCnic: String,
  userEmail: String,
  hostelName: String,
  bookingRent: String,
  bookingDate: String,
  stayMonths: String,
});
module.exports = mongoose.model("Booking", BookingSchema);
