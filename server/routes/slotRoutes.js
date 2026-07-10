const express = require("express");

const router = express.Router();

const {
  createSlot,
  getSlots,
} = require("../controllers/slotController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.post(
  "/",
  protect,
  authorizeRoles("admin", "organizer"),
  createSlot
);

router.get("/", getSlots);

module.exports = router;