var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "fiver2926@gmail.com",
    pass: "vnux kasd qzmv aqzr",
  },
});
function sendBookingEmail(to, subject, body) {
  // Create the mail options
  var mailOptions = {
    from: "fiver2926@gmail.com", // Replace with your sender email
    to: to,
    subject: subject,
    text: body,
  };

  // Send the email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
module.exports = sendBookingEmail;
// sendBookingEmail(to, subject, body);
// Example usage (assuming you have user data from booking)
// const userEmail = "user@example.com";
// const userName = "John Doe";
// const userCnic = "12345-67890-1234";
