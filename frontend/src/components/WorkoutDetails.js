import { useWorkoutContext } from "../hooks/useWorkoutContext"
import moment from 'moment'
import useAuthContext from '../hooks/useAuthContext'


const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutContext()
    const { token } = useAuthContext()


    const onDelete = async () => {
        if (!token) {
            return
        }

        const response = await fetch('http://localhost:4000/api/workouts/' + workout._id, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        })
        // const json = await response.json()

        if (response.ok) {
            dispatch({
                type: 'DELETE_WORKOUT',
                payload: workout
            })
        }
    }

    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg):</strong>{workout.load}</p>
            <p><strong>Reps:</strong>{workout.reps}</p>
            <p>{moment(workout.createdAt).fromNow()}</p>
            <span className="material-symbols-outlined" onClick={onDelete}>delete</span>
        </div>
    );
}

export default WorkoutDetails;