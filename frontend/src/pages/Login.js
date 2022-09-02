import { useState } from "react";
import useLogin from '../hooks/useLogin'

const Login = () => {
    const [phone, setPhone] = useState('')
    const [passowrd, setPassword] = useState('')
    const { login, isLoading, error } = useLogin()

    const onLogin = async (e) => {
        e.preventDefault()
        await login(phone, passowrd)
    }


    return (
        <form className="login" onSubmit={onLogin}>
            <h3>Login</h3>

            <label>Phone:</label>
            <input
                type="text"
                onChange={(e) => { setPhone(e.target.value) }}
                value={phone}
                required
            />


            <label>Password:</label>
            <input
                type="password"
                onChange={(e) => { setPassword(e.target.value) }}
                value={passowrd}
                required
            />


            <button disabled={isLoading}>Log-in</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
}

export default Login;