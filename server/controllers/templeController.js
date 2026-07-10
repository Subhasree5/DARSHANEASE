const Temple = require("../models/Temple");

// Create Temple
exports.createTemple = async (req, res) => {
  try {
    const {
      name,
      city,
      state,
      description,
      image,
      timings,
    } = req.body;

    const temple = await Temple.create({
      organizer: req.user.id,   // Logged-in organizer/admin
      name,
      city,
      state,
      description,
      image,
      timings,
    });

    res.status(201).json({
      success: true,
      message: "Temple Added Successfully",
      temple,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Get All Temples
exports.getTemples = async (req, res) => {

  try {

    const temples = await Temple.find().populate(
      "organizer",
      "name email role"
    );

    res.status(200).json({
      success: true,
      count: temples.length,
      temples,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};