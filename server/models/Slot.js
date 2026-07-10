const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema(
  {
    temple: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Temple",
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    capacity: {
      type: Number,
      required: true,
    },

    price: {
        type: Number,
        required: true,
    },
    bookedSeats: {
      type: Number,
      default: 0,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Slot", slotSchema);