const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const RegisterDataSchema = new mongoose.Schema({
  ownerName: String,
  ownerImage: String,
  ownerEmail: String,
  ownerPassword: String,
});
RegisterDataSchema.pre("save", async function (next) {
  this.ownerPassword = await bcrypt.hash(this.ownerPassword, 12);
  next();
});
module.exports = mongoose.model("OwnerRegistration", RegisterDataSchema);
