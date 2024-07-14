const UserData = require("../Models/UserRegistration");
const stripe = require("stripe")(process.env.STRIPE_kEY);
const RecordPayment = require("../Models/RecordPayment");
module.exports.Payment = async (req, res) => {
  const { serviceName, servicePrice, ownerName, timestamp } = req.body;
  // const userData = JSON.parse(user)
  console.log(serviceName, servicePrice, ownerName, timestamp);
  const lineItems = [
    {
      price_data: {
        currency: "usd", // Replace with the desired currency
        product_data: {
          name: serviceName, // Replace with the product name
        },
        unit_amount: servicePrice * 100, // Replace with the price in cents (e.g., $5.00)
      },
      quantity: 1, // Set the quantity as needed
    },
  ];

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3002/sucess",
    cancel_url: "http://localhost:3002/cancel",
  });
  if (session) {
    const { userEmail } = req.query;
    const userCheck = await UserData.findOne({ userEmail });
    console.log(userCheck);
    let newPayment = await RecordPayment.create({
      serviceName: serviceName,
      servicePrice: servicePrice,
      ownerName: ownerName,
      flag: false,
      timestamp: timestamp,
    });
    console.log(newPayment);
    console.log(session.id);
  }
  res.json({ id: session.id });
};
module.exports.GetPaymentRecord = async (req, res) => {
  try {
    const recordPayment = await RecordPayment.find();
    res.json(recordPayment);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports.UpdatePaymentStatus = async (req, res) => {
  const { serviceName, servicePrice, ownerName, timestamp, flag } = req.body;
  // if (!serviceName || !servicePrice || !ownerName || !timestamp) {
  //   return res
  //     .status(400)
  //     .json({ message: "Please provide all required fields" });
  // }
  const updatePaymentStatus = req.params.id;
  console.log(updatePaymentStatus);
  try {
    await RecordPayment.findByIdAndUpdate(
      updatePaymentStatus,
      {
        ownerName,
        serviceName,
        servicePrice,
        flag,
        timestamp,
      },
      { new: true }
    );

    if (!updatePaymentStatus) {
      return res.status(404).json({ error: "Payment not found" });
    }

    res.json({ message: "Service updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
