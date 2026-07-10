const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

const {
  getMonthlyBookings,
} = require("../controllers/reportController");

router.get(
  "/monthly",
  protect,
  authorizeRoles("admin"),
  getMonthlyBookings
);

module.exports = router;