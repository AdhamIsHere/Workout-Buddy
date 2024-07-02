const User = require("../models/userModel");

// login
const login = async (req, res) => {
  res.send({ message: "login" });
};

// signup
const signup = async (req, res) => {
  res.send({ message: "signup" });
};

module.exports = { signup, login };
