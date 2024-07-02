const express = require("express");

const router = express.Router();

const { signup, login } = require("../controllers/userController");
// login
router.post("/login", login);

// signup
router.post("/signup", signup);

module.exports = router;
