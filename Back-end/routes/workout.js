const express = require("express");
const router = express.Router();
const {
  createNewWorkout,
  getAllWorkouts,
  getSingleWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");

// Get all workouts
router.get("/", getAllWorkouts);

// Get single workout
router.get("/:id", getSingleWorkout);

// Add new workout
router.post("/", createNewWorkout);

// Delete a workout
router.delete("/:id", deleteWorkout);

// Update a workout
router.patch("/:id", updateWorkout);

module.exports = router;
