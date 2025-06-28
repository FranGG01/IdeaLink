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
    <>
      <div className='justify-center flex' >
        <div className="flex min-h-full flex-col justify-center mt-50 lg:px-8 pb-20 w-[500px] h-[550px] shadow-xl  shadow-purple-500/50  ">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img className="mx-auto h-50 " src={logo} alt="Your Company" />
            <h2 className=" text-center text-2xl/9 font-bold tracking-tight text-gray-900">REGISTRA TU CUENTA</h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleRegister} className="space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Correo electronico</label>
                <div className="mt-2">
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" id="email" autoComplete="email" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Contraseña</label>
                  <div className="text-sm">

                  </div>
                </div>
                <div className="mt-2">
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" id="password" autoComplete="current-password" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                </div>
              </div>

              <div>
                <button type="submit" className="flex w-full justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Registrate</button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
