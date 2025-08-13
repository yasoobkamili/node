const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  propertyType: { type: String, required: true },
  location: { type: String, required: true }, // raw text location/landmark
  service: { type: String, required: true },
  date: { type: Date, required: true },
  frequency: { type: String, required: true },
  message: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // optional if login is required
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", bookingSchema);
