import { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import useAuthContext from '../hooks/useAuthContext'

const WorkoutForm = () => {
    const { dispatch } = useWorkoutContext()
    const [title, setTile] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const { token } = useAuthContext()


    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!token){
            setError('You must be logged in')
            return
        }

        const workout = { title, load, reps }

        const response = await fetch('http://localhost:4000/api/workouts', {
            method: 'POST', body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setEmptyFields(json.emptyFields)
            return setError(json.message)
        }

        setError(null)
        setEmptyFields([])
        setTile('')
        setLoad('')
        setReps('')

        dispatch({
            type: 'CREATE_WORKOUT',
            payload: json.workout
        })
    }

    return (
        <div className="workout-form">

            <form className="create" onSubmit={handleSubmit}>
                <h3>Add A New Workout</h3>

                <label>Excersize Title:</label>
                <input
                    type="text"
                    onChange={(e) => { setTile(e.target.value) }}
                    value={title}
                    className={emptyFields?.includes('title') ? 'error' : ''}
                />

                <label>Load (in kg):</label>
                <input
                    type="number"
                    onChange={(e) => { setLoad(e.target.value) }}
                    value={load}
                    className={emptyFields?.includes('load') ? 'error' : ''}
                />


                <label>Reps:</label>
                <input
                    type="number"
                    onChange={(e) => { setReps(e.target.value) }}
                    value={reps}
                    className={emptyFields?.includes('reps') ? 'error' : ''}
                />

                <button>Add Workout</button>
                {error && <div className="error">{error}</div>}
            </form>

        </div>
    );
}

export default WorkoutForm;