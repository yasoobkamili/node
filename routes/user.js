const express = require("express");
const User = require("../models/user");
const {
  handleGetHomePage,
  handleGetSignInPage,
  handleGetSignUpPage,
  handleSignUp,
  handleSignIn,
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
router.route("/myprofile").get((req, res) => {
  res.render("main/myprofile");
});
router.route("/mybookings").get((req, res) => {
  res.render("main/mybookings");
});
router.route("/settings").get((req, res) => {
  res.render("main/settings");
});

module.exports = router;
