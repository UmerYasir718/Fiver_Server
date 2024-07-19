const UserReview = require("../Models/UserReview");
module.exports.UserReviewData = async (req, res) => {
  try {
    const { userName, description } = req.body;

    // Simple validation, ensure all fields are provided
    if (!userName || !description) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }
    let newReview = await UserReview.create({
      userName: userName,
      description: description,
    });
    console.log(newReview);
    res.json({ success: true, message: "Thanks For Review", newReview });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports.GetReviews = async (req, res) => {
  try {
    const reviews = await UserReview.find();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
