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

module.exports = router;
