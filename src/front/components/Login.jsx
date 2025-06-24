import { useState } from 'react';
import { login } from '../store';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleInputChange(e) {
        const { name, value } = e.target;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await login(email, password);
            alert("Login Successfully")
            

        } catch (error) {
            alert("Error al iniciar sesión: " + error.message);
        }
    };
    return (
        <>
            <h1>Welcome back!</h1>
            <h4>Please enter log in details below</h4>
            <br></br>
            <form onSubmit={handleLogin}>
                <p>Email</p>
                <input
                    type="email"
                    name='email'
                    placeholder='example@gmail.com'
                    value={email}
                    onChange={handleInputChange}

                />

                <p>Password</p>
                <input
                    type="password"
                    name='password'
                    placeholder='*******'
                    value={password}
                    onChange={handleInputChange}
                />
                <button type='submit'>Log in</button>
            </form>
            
        </>
    )
}

export default Login;