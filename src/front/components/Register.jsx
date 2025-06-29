import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/img/Logo.png';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/api/register", {
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
    <div className="flex justify-center px-4 py-10 min-h-screen bg-white overflow-auto">
      <div className="flex flex-col justify-center w-full max-w-[500px] h-auto lg:h-[550px] shadow-xl shadow-purple-500/50 rounded-lg p-6 bg-white">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-20 object-contain" src={logo} alt="Your Company" />
          <h2 className="mt-4 text-center text-2xl font-bold tracking-tight text-gray-900">
            REGISTRA TU CUENTA
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleRegister} className="space-y-6" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                Correo electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                id="email"
                autoComplete="email"
                required
                className="mt-2 block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                id="password"
                autoComplete="current-password"
                required
                className="mt-2 block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              >
                Regístrate
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
