const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
// login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    // create token
    const token = generateToken(user._id);
    const name = user.name;
    res.status(200).json({ email, name, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup
const signup = async (req, res) => {
  const { email, name, password } = req.body;

  try {
    const user = await User.signup(email, password, name);

    // create token
    const token = generateToken(user._id);

    res.status(201).json({ email, name, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signup, login };
