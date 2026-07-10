const User = require("../models/User");
const Temple = require("../models/Temple");
const Slot = require("../models/Slot");
const Booking = require("../models/Booking");

// Dashboard Statistics
exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalTemples = await Temple.countDocuments();
    const totalSlots = await Slot.countDocuments();
    const totalBookings = await Booking.countDocuments();

    const revenue = await Booking.aggregate([
      {
        $match: {
          bookingStatus: "Confirmed",
          paymentStatus: { $in: ["Pending", "Paid"] }
        }
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalTemples,
        totalSlots,
        totalBookings,
        totalRevenue:
          revenue.length > 0 ? revenue[0].totalRevenue : 0
      }
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};