const Booking = require("../models/Booking");
const Slot = require("../models/Slot");

// Create Booking
exports.createBooking = async (req, res) => {
  try {
    const { slotId, numberOfPersons } = req.body;

    // Find Slot
    const slot = await Slot.findById(slotId).populate("temple");

    if (!slot) {
      return res.status(404).json({
        success: false,
        message: "Slot not found",
      });
    }

    // Check seat availability
    const availableSeats = slot.capacity - slot.bookedSeats;

    if (availableSeats < numberOfPersons) {
      return res.status(400).json({
        success: false,
        message: "Not enough seats available",
      });
    }

    // Calculate amount
    console.log("========== DEBUG ==========");
    console.log("Request Body:", req.body);
    console.log("Slot:", slot);
    console.log("Slot Price:", slot.price);
    console.log("Number Of Persons:", numberOfPersons);
    console.log("Type of Slot Price:", typeof slot.price);
    console.log("Type of Number Of Persons:", typeof numberOfPersons);
    console.log("===========================");
    const totalAmount = slot.price * numberOfPersons;
    console.log("Total Amount:", totalAmount);

    // Generate Booking ID
    const bookingId = "DE" + Date.now();

    // Create Booking
    const booking = await Booking.create({
      bookingId,
      user: req.user.id,
      slot: slot._id,
      temple: slot.temple._id,
      numberOfPersons,
      totalAmount,
    });

    // Update booked seats
    slot.bookedSeats += numberOfPersons;

    if (slot.bookedSeats >= slot.capacity) {
      slot.isAvailable = false;
    }

    await slot.save();

    res.status(201).json({
      success: true,
      message: "Booking Successful",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// My Bookings
// Get Logged-in User Bookings
exports.getMyBookings = async (req, res) => {
  try {

    const bookings = await Booking.find({
      user: req.user.id,
    })
      .populate("temple", "name city state")
      .populate("slot", "date time")
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

// Cancel Booking
// Cancel Booking
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Ensure user owns the booking
    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Prevent duplicate cancellation
    if (booking.bookingStatus === "Cancelled") {
      return res.status(400).json({
        success: false,
        message: "Booking already cancelled",
      });
    }

    // Restore seats
    const slot = await Slot.findById(booking.slot);

    slot.bookedSeats -= booking.numberOfPersons;

    if (slot.bookedSeats < slot.capacity) {
      slot.isAvailable = true;
    }

    await slot.save();

    // Update booking status
    booking.bookingStatus = "Cancelled";
    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking Cancelled Successfully",
      booking,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};