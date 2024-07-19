const mongoose = require("mongoose");
const UserReviewSchema = new mongoose.Schema({
  userName: String,
  description: String,
});
module.exports = mongoose.model("UserReview", UserReviewSchema);
