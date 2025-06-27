import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("https://supreme-telegram-7vpvr97px66vhpr55-3001.app.github.dev/api/register", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Usuario registrado correctamente');
                navigate("/");
            } else {
                alert(data.msg || 'Error al registrar usuario');
            }
        } catch (error) {
            console.error('Error en el registro:', error);
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <h2>Registro</h2>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                required
            />
            <button type="submit" className='font-semibold text-purple-600 hover:text-indigo-500'>Registrarse</button>
        </form>
    );
};

export default Register;
