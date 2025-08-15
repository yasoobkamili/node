const express = require("express");
const User = require("../models/user");
const {
  handleGetHomePage,
  handleGetSignInPage,
  handleGetSignUpPage,
  handleSignUp,
  handleSignIn,
  renderMyBookingsPage,
  renderMyProfilePage,
  handleLogout,
} = require("../controllers/user");

const router = express.Router();

router.route("/").get(handleGetHomePage);

router.route("/signin").get(handleGetSignInPage).post(handleSignIn);

router.route("/signup").get(handleGetSignUpPage).post(handleSignUp);

router.route("/cleaning").get((req, res) => {
  res.render("Cleaning/cleaning");
});
router.route("/plumbing").get((req, res) => {
  res.render("Plumbing/plumbing");
});
// Dummy auth middleware for demonstration
function requireAuth(req, res, next) {
  // In production, replace with real authentication
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });
  next();
}
router.route("/mybookings").get(requireAuth, renderMyBookingsPage);
router.route("/myprofile").get(requireAuth, renderMyProfilePage);
router.route("/settings").get((req, res) => {
  res.render("main/settings");
});
router.route("/logout").get(handleLogout);

module.exports = router;
