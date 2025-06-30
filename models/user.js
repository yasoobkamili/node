const mongoose = require("mongoose");

const signUpSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [/.+\@.+\..+/, "Please enter a valid email address"],
    unique: true,
  },
  phoneNo: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = new mongoose.model("users", signUpSchema);

module.exports = User;
