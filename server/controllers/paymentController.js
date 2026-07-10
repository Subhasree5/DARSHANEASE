const Booking = require("../models/Booking");

// Mock Payment Success
exports.makePayment = async (req, res) => {
  try {
    const { bookingId } = req.body;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    booking.paymentStatus = "Paid";
    await booking.save();

    res.status(200).json({
      success: true,
      message: "Payment Successful",
      booking,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};