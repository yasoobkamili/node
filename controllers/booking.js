const Booking = require("../models/booking");
const User = require("../models/user");

// Create a new booking
async function createBooking(req, res) {
  try {
    const { serviceType, date, details } = req.body;
    const userId = req.user ? req.user._id : null;
    if (!userId) {
      // If not logged in, redirect to login
      return res.redirect("/signin");
    }
    const booking = await Booking.create({
      user: userId,
      serviceType,
      date,
      details,
    });
    // If form submission, redirect to mybookings
    if (
      req.headers.accept &&
      req.headers.accept.indexOf("application/json") === -1
    ) {
      return res.redirect("/mybookings");
    }
    res.status(201).json(booking);
  } catch (err) {
    if (
      req.headers.accept &&
      req.headers.accept.indexOf("application/json") === -1
    ) {
      return res.redirect("/seva?error=1");
    }
    res.status(400).json({ error: err.message });
  }
}

// Get all bookings for a user
async function getUserBookings(req, res) {
  try {
    const userId = req.user._id;
    const bookings = await Booking.find({ user: userId }).sort({ date: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get all bookings (admin or for management)
async function getAllBookings(req, res) {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .sort({ date: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Update a booking (status or details)
async function updateBooking(req, res) {
  try {
    const { id } = req.params;
    const update = req.body;
    const booking = await Booking.findByIdAndUpdate(id, update, { new: true });
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    res.json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Cancel a booking
async function cancelBooking(req, res) {
  try {
    const { id } = req.params;
    const booking = await Booking.findByIdAndUpdate(
      id,
      { status: "cancelled" },
      { new: true }
    );
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    res.json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  createBooking,
  getUserBookings,
  getAllBookings,
  updateBooking,
  cancelBooking,
};
