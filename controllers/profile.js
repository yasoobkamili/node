const User = require("../models/user");

// Get user profile
async function getProfile(req, res) {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Update user profile
async function updateProfile(req, res) {
  try {
    const userId = req.user._id;
    const update = req.body;
    if (update.password) delete update.password; // Prevent password update here
    // Combine firstName and lastName into name
    if (update.firstName || update.lastName) {
      update.name = `${update.firstName || ""} ${update.lastName || ""}`.trim();
      delete update.firstName;
      delete update.lastName;
    }
    const user = await User.findByIdAndUpdate(userId, update, {
      new: true,
      select: "-password",
    });
    if (!user) return res.status(404).json({ error: "User not found" });
    // If form submission, redirect back to profile
    if (
      req.headers.accept &&
      req.headers.accept.indexOf("application/json") === -1
    ) {
      return res.redirect("/myprofile");
    }
    res.json(user);
  } catch (err) {
    if (
      req.headers.accept &&
      req.headers.accept.indexOf("application/json") === -1
    ) {
      return res.redirect("/myprofile?error=1");
    }
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  getProfile,
  updateProfile,
};
