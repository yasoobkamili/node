const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("seva");
});

app.get("/signin", (req, res) => {
  res.render("signin");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

// signup functionality
app.post("/signup", async (req, res) => {
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
  const existingUser = await collection.findOne({
    $or: [{ email: data.email }, { phoneNo: data.phoneNo }],
  });

  if (existingUser) {
    return res.send("User already exists. Koi aur naam rakho.");
  }

  // hashing password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(data.password, saltRounds);

  // save hashed password and del confirmPassword
  data.password = hashedPassword;
  delete data.confirmPassword;

  // adding user to mogodb
  const newUser = await collection.insertMany(data);
  console.log("User registered:", newUser);

  res.render("signupsuccess");
});

// dignin functionality
app.post("/signin", async (req, res) => {
  console.log(req.body.email);
  try {
    const email = await collection.findOne({ email: req.body.email });

    if (!email) {
      return res.send("user email not found");
    }

    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      email.password
    );

    if (isPasswordMatch) {
      return res.render("home");
    } else {
      return res.send("wrong password entered");
    }
  } catch (error) {
    console.error("Signin error:", error);
    return res.send("Something went wrong. Please try again.");
  }
});

// start server
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
