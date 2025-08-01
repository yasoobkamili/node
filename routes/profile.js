const express = require("express");
const { getProfile, updateProfile } = require("../controllers/profile");

// Dummy auth middleware for demonstration
function requireAuth(req, res, next) {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });
  next();
}

const router = express.Router();

router.get("/", requireAuth, getProfile);
router.put("/", requireAuth, updateProfile);

module.exports = router;
