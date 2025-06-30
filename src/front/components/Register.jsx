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
    <div className="h-screen flex justify-center items-center bg-gray-900 text-white">
      <div className="flex flex-col justify-center w-full max-w-[500px] h-auto lg:h-[550px] shadow-xl shadow-purple-500/40 rounded-lg p-6 bg-gray-800">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="flex justify-center">
            <img className="h-32 object-contain mb-4" src={logo} alt="Your Company" />
          </div>

          <h2 className="mt-4 text-center text-2xl font-bold tracking-tight text-white">
            REGISTRA TU CUENTA
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleRegister} className="space-y-6" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
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
                className="mt-2 block w-full rounded-md bg-gray-700 px-3 py-2 text-white outline outline-1 outline-gray-500 placeholder:text-gray-400 focus:outline-2 focus:outline-purple-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
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
                className="mt-2 block w-full rounded-md bg-gray-700 px-3 py-2 text-white outline outline-1 outline-gray-500 placeholder:text-gray-400 focus:outline-2 focus:outline-purple-500 sm:text-sm"
              />
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-purple-600 px-4 py-2 cursor-pointer text-sm font-semibold text-white shadow hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
