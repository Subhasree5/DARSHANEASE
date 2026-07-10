const Slot = require("../models/Slot");

// Create Slot
exports.createSlot = async (req, res) => {
  try {
    const slot = await Slot.create(req.body);

    res.status(201).json({
      success: true,
      message: "Slot Created Successfully",
      slot,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Slots
exports.getSlots = async (req, res) => {
  try {
    const slots = await Slot.find().populate("temple");

    res.status(200).json({
      success: true,
      count: slots.length,
      slots,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};