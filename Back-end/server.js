require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workout");
const userRoutes = require("./routes/user");

// middleware
const logger = (req, res, next) => {
  console.log(req.method, req.path);
  next();
};
// app
const app = express();
app.use(express.json());
app.use(logger);

// routes
app.use("/api/workout", workoutRoutes);
app.use("/api/user", userRoutes);

// database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // request listener port 4000
    app.listen(process.env.PORT, () => {
      console.log(`Connected to DB and listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
