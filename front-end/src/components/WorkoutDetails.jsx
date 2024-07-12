import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { FaTrash } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import { useAuthContext } from "../hooks/useAuthContext";
const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const handleClick = async () => {
    if (!user) return;
    const res = await fetch(`/api/workout/${workout._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
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
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span id="deleteSpan">
        <FaTrash className="deleteIcon" onClick={handleClick} />
      </span>
    </div>
  );
};

export default WorkoutDetails;
