const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  makePayment,
} = require("../controllers/paymentController");

router.post(
  "/pay",
  protect,
  makePayment
);

module.exports = router;