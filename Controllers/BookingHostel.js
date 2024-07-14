const BookHostel = require("../Models/BookService");
const sendBookingEmail = require("./EmailSender");
module.exports.BookingHostel = async (req, res) => {
  try {
    const {
      userName,
      userCnic,
      userEmail,
      hostelName,
      bookingDate,
      calculatedHostelRent,
      hostelStay,
    } = req.body;

    // Simple validation, ensure all fields are provided
    if (
      !userEmail ||
      !userName ||
      !userCnic ||
      !hostelName ||
      !bookingDate ||
      !calculatedHostelRent ||
      !hostelStay
    ) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }

    let newBooking = await BookHostel.create({
      userName: userName,
      userEmail: userEmail,
      userCnic: userCnic,
      hostelName: hostelName,
      bookingRent: calculatedHostelRent,
      bookingDate: bookingDate,
      stayMonths: hostelStay,
    });
    // console.log(newUser);
    const subject = `Booking Confirmation of ${newBooking.hostelName}`;
    const body = `
<p>
  Dear ${newBooking.userName},
</p>
<p>
  This email confirms your booking on Airbnb. Your CNIC for reference is ${newBooking.userCnic}.
</p>
<p>
  Your booking is from ${newBooking.bookingDate} for ${newBooking.stayMonths} month(s) and the total charges are ${newBooking.bookingRent}.
</p>
<p>
  If you have any questions, please don't hesitate to contact us.
</p>
<p>
  Thanks,
</p>
<p>
  The Airbnb Team
</p>
`;

    newBooking
      ? sendBookingEmail(newBooking.userEmail, subject, body)
      : console.log("Hostel is Not Booking");
    res.json({
      success: true,
      message: "Hostel Booked Successfully",
      newBooking,
    });
  } catch (error) {
    console.error("Error creating User:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
