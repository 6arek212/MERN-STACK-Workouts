import { useState } from 'react'
import useAuthContext from '../hooks/useAuthContext'

const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const signup = async (phone, firstName, lastName, password) => {
        setLoading(true)
        setError(null)

        const response = await fetch('http://localhost:4000/api/users/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName, lastName, phone, password })
        })

        const json = await response.json()


        if (!response.ok) {
            setLoading(false)
            setError(json.message)
            return
        }

        //save the use to loact storage
        localStorage.setItem('user', JSON.stringify({ user: json.user, token: json.token }))

        // update auth context
        dispatch({
            type: 'LOGIN',
            payload: { user: json.user, token: json.token }
        })

        setLoading(false)
    }

    return { signup, isLoading, error }
}

export default useSignup;