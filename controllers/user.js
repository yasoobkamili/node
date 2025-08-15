const User = require("../models/user");
const bcrypt = require("bcrypt");
const Booking = require("../models/booking");

function handleGetHomePage(req, res) {
  res.render("main/seva");
}
function handleGetHomePage(req, res) {
  res.render("main/seva");
}
function handleGetSignInPage(req, res) {
  res.render("signin");
}
function handleGetSignUpPage(req, res) {
  res.render("signup");
}
function handleLogout(req, res) {
  req.session.destroy(() => {
    res.redirect("/signin");
  });
}

async function handleSignUp(req, res) {
  console.log(req.body); // temporary check

  const data = {
    name: req.body.username,
    email: req.body.email,
    phoneNo: req.body.phoneNo,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  };

  // check if passwords match
  if (data.password !== data.confirmPassword) {
    return res.send("Passwords do not match, please try again.");
  }

  // cneck if user already exists
  const existingUser = await User.findOne({
    $or: [{ email: data.email }, { phoneNo: data.phoneNo }],
  });

  if (existingUser) {
    return res.status(409).json({ message: "User already exists!" });
  }

  // hashing password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(data.password, saltRounds);

  // save hashed password and del confirmPassword
  data.password = hashedPassword;
  delete data.confirmPassword;

  // adding user to mogodb
  const newUser = await User.create(data);
  console.log("User registered:", newUser);

  res.render("signin");
}

async function handleSignIn(req, res) {
  console.log(req.body.email);
  try {
    const email = await User.findOne({ email: req.body.email });

    if (!email) {
      return res.send("user email not found");
    }

    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      email.password
    );

    if (isPasswordMatch) {
      req.session.userId = email._id; // Set session userId
      return res.render("main/afterLogin");
    } else {
      return res.status(401).send("Wrong Password Entered!");
    }
  } catch (error) {
    console.error("Signin error:", error);
    return res.send("Something went wrong. Please try again.");
  }
}

// Render My Bookings page with user's bookings
async function renderMyBookingsPage(req, res) {
  try {
    const userId = req.user._id;
    const bookings = await Booking.find({ user: userId }).sort({ date: -1 });
    res.render("main/mybookings", { bookings });
  } catch (err) {
    res.status(500).send("Failed to load bookings");
  }
}

// Render My Profile page with user info and stats
async function renderMyProfilePage(req, res) {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select("-password");
    const bookings = await Booking.find({ user: userId });
    res.render("main/myprofile", { user, bookings });
  } catch (err) {
    res.status(500).send("Failed to load profile");
  }
}

module.exports = {
  handleGetHomePage,
  handleGetSignInPage,
  handleGetSignUpPage,
  handleSignUp,
  handleSignIn,
  renderMyBookingsPage,
  renderMyProfilePage,
  handleLogout,
};
