import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newWorkout = { title, load, reps };
    const res = await fetch("/api/workout/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newWorkout),
    });
    const json = await res.json();
    if (!res.ok) {
      setError(json.error);
    }
    if (res.ok) {
      setError(null);
      setTitle("");
      setLoad("");
      setReps("");
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };
  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Create a New Workout</h3>
      <label>Exercise Title: </label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <label>Load (kg): </label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
      />

      <label>Reps: </label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
