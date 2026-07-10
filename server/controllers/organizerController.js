const Booking = require("../models/Booking");

exports.getOrganizerBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email phone")
      .populate("temple", "name city state")
      .populate("slot", "date time price")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      totalBookings: bookings.length,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};