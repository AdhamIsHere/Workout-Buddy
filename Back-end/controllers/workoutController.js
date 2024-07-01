const { isValidObjectId } = require("mongoose");
const Workout = require("../models/workoutModel");
// Get all workouts
const getAllWorkouts = async (req, res) => {
  const workouts = await Workout.find().sort({ createdAt: -1 });
  res.status(200).json(workouts);
};
// Get single workout
const getSingleWorkout = async (req, res) => {
  if (isValidObjectId(req.params.id)) {
    const workout = await Workout.findById(req.params.id);
    if (!workout) {
      return res.status(404).json({ error: "Can't Find Workout" });
    }
    res.status(200).json(workout);
  } else {
    res.status(404).json({ error: "Not A Valid ID" });
  }
};
// Add new workout
const createNewWorkout = async (req, res) => {
  const { title, load, reps } = req.body;
  try {
    // adding doc to db
    const workout = await Workout.create({ title, load, reps });
    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({ error: err.message });
    console.log(err);
  }
};
// Delete a workout
const deleteWorkout = async (req, res) => {
  if (isValidObjectId(req.params.id)) {
    const workout = await Workout.findOneAndDelete({ _id: req.params.id });
    res.status(200).json(workout);
  } else {
    res.status(404).json({ error: "Not A Valid ID" });
  }
};
// Update a workout
const updateWorkout = async (req, res) => {
  if (isValidObjectId(req.params.id)) {
    const workout = await Workout.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );
    res.status(200).json(workout);
  } else {
    res.status(404).json({ error: "Not A Valid ID" });
  }
};

module.exports = {
  createNewWorkout,
  getAllWorkouts,
  getSingleWorkout,
  deleteWorkout,
  updateWorkout,
};
