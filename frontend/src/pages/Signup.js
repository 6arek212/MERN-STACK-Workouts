import { useState } from "react";
import useSignup from "../hooks/useSignup";


const Signup = () => {
    const [phone, setPhone] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [passowrd, setPassword] = useState('')
    const { signup, error, isLoading } = useSignup()

    const onSignup = async (e) => {
        e.preventDefault()
        await signup(phone, firstName, lastName, passowrd)
    }


    return (
        <form className="signup" onSubmit={onSignup}>
            <h3>Signup</h3>

            <label>First Name:</label>
            <input
                type="text"
                onChange={(e) => { setFirstName(e.target.value) }}
                value={firstName}
            />


            <label>Last Name:</label>
            <input
                type="text"
                onChange={(e) => { setLastName(e.target.value) }}
                value={lastName}
            />


            <label>Phone:</label>
            <input
                type="text"
                onChange={(e) => { setPhone(e.target.value) }}
                value={phone}
            />


            <label>Password:</label>
            <input
                type="password"
                onChange={(e) => { setPassword(e.target.value) }}
                value={passowrd}
            />


            <button disabled={isLoading}>Sign up</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
}

export default Signup;