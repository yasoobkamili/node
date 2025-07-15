const User = require("../models/user");
const bcrypt = require("bcrypt");

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

async function handleSignUp(req, res) {
  console.log(req.body);

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
      return res.render("main/afterLogin");
    } else {
      return res.status(401).send("Wrong Password Entered!");
    }
  } catch (error) {
    console.error("Signin error:", error);
    return res.send("Something went wrong. Please try again.");
  }
}

module.exports = {
  handleGetHomePage,
  handleGetSignInPage,
  handleGetSignUpPage,
  handleSignUp,
  handleSignIn,
};
