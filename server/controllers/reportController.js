const Booking = require("../models/Booking");

// Monthly Booking Report
exports.getMonthlyBookings = async (req, res) => {
  try {
    const report = await Booking.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          totalBookings: { $sum: 1 },
          totalRevenue: { $sum: "$totalAmount" }
        }
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1
        }
      }
    ]);

    res.status(200).json({
      success: true,
      report
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};