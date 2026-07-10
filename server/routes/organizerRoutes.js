const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

const {
  getOrganizerBookings,
} = require("../controllers/organizerController");

router.get(
  "/bookings",
  protect,
  authorizeRoles("admin"),
  getOrganizerBookings
);

module.exports = router;