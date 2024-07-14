const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const RegisterDataSchema = new mongoose.Schema({
  userName: String,
  userEmail: String,
  userPassword: String,
});
RegisterDataSchema.pre("save", async function (next) {
  this.userPassword = await bcrypt.hash(this.userPassword, 12);
  next();
});
module.exports = mongoose.model("UserRegistration", RegisterDataSchema);
