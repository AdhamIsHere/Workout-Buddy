import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { FaTrash } from "react-icons/fa";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();

  const handleClick = async () => {
    const res = await fetch(`/api/workout/${workout._id}`, {
      method: "DELETE",
    });
    const json = await res.json();
    if (!res.ok) {
      console.log(json.error);
    } else {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
    console.log(json);
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>{new Date(workout.createdAt).toLocaleString()}</p>
      <span id="deleteSpan">
        <FaTrash className="deleteIcon" onClick={handleClick} />
      </span>
    </div>
  );
};

export default WorkoutDetails;
