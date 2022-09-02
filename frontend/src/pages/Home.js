import { useEffect } from 'react'
import { useWorkoutContext } from '../hooks/useWorkoutContext'
import useAuthContext from '../hooks/useAuthContext'

//components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {
    const { workouts, dispatch } = useWorkoutContext()
    const { token } = useAuthContext()

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('http://localhost:4000/api/workouts', {
                method: 'GET', headers: { 'Authorization': `Bearer ${token}` }
            })
            const json = await response.json()
            if (response.ok) {
                dispatch({
                    type: 'SET_WORKOUTS',
                    payload: json.workouts
                })
            }
        }

        if (token)
            fetchWorkouts()
    }, [dispatch, token])



    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>

            <WorkoutForm />
        </div>
    );
}

export default Home;