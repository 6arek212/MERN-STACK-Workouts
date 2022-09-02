import useAuthContext from '../hooks/useAuthContext'
import { useWorkoutContext } from '../hooks/useWorkoutContext'


const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: dispatchWorkout } = useWorkoutContext()

    const logout = () => {
        // remove use from storage
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        dispatch({
            type: 'LOGOUT'
        })
        dispatchWorkout({
            type: 'SET_WORKOUTS',
            payload: null
        })
    }

    return { logout }
}

export default useLogout;