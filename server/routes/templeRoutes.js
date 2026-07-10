const express = require("express");
const router = express.Router();

const {
  createTemple,
  getTemples,
} = require("../controllers/templeController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

// Only Organizer and Admin can create temples
router.post(
  "/",
  protect,
  authorizeRoles("admin", "organizer"),
  createTemple
);

// Anyone can view temples
router.get("/", getTemples);

module.exports = router;