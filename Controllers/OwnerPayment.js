const OwnerPayment = require("../Models/OwnerPayment");
module.exports.AddPayment = async (req, res) => {
  try {
    const { ownerName, cardName, cardNumber } = req.body;

    // Simple validation, ensure all fields are provided
    if (!cardName || !cardNumber || !ownerName) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }
    let newMethod = await OwnerPayment.create({
      ownerName: ownerName,
      cardName: cardName,
      cardNumber: cardNumber,
    });
    console.log(newMethod);
    res.json({
      success: true,
      message: "Account Created successful",
      newMethod,
    });
  } catch (error) {
    console.error("Error creating Owner:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports.GetPayment = async (req, res) => {
  try {
    const method = await OwnerPayment.find();
    res.json(method);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports.UpdatePayment = async (req, res) => {
  const { cardName, cardNumber } = req.body;
  if (!cardName || !cardNumber) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }
  const updatePayment = req.params.id;
  try {
    await OwnerPayment.findByIdAndUpdate(
      updatePayment,
      {
        cardName,
        cardNumber,
      },
      { new: true }
    );

    if (!updatePayment) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.json({ message: "Service updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
