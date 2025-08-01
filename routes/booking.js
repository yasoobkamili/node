const express = require("express");
const {
  createBooking,
  getUserBookings,
  getAllBookings,
  updateBooking,
  cancelBooking,
} = require("../controllers/booking");

// Dummy auth middleware for demonstration
function requireAuth(req, res, next) {
  // In production, replace with real authentication
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });
  next();
}

const router = express.Router();

// User's bookings
router.get("/my", requireAuth, getUserBookings);
// All bookings (admin)
router.get("/all", getAllBookings);
// Create booking (allow form submission)
router.post("/", createBooking);
// Update booking
router.put("/:id", requireAuth, updateBooking);
// Cancel booking
router.delete("/:id", requireAuth, cancelBooking);

module.exports = router;
