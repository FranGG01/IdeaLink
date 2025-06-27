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
        <>
        <div className='justify-center flex' >
        <div class="flex min-h-full flex-col justify-center mt-50 lg:px-8 pb-20 w-[500px] h-[550px] shadow-xl  shadow-purple-500/50  ">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img className="mx-auto h-50 " src={logo} alt="Your Company" />
    <h2 class=" text-center text-2xl/9 font-bold tracking-tight text-gray-900">REGISTRA TU CUENTA</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form onSubmit={handleRegister} class="space-y-6" action="#" method="POST">
      <div>
        <label for="email" class="block text-sm/6 font-medium text-gray-900">Correo electronico</label>
        <div class="mt-2">
          <input type="email"  value={email} onChange={(e) => setEmail(e.target.value)} name="email" id="email" autocomplete="email" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm/6 font-medium text-gray-900">Contraseña</label>
          <div class="text-sm">
            
          </div>
        </div>
        <div class="mt-2">
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" id="password" autocomplete="current-password" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
        </div>
      </div>

      <div>
        <button type="submit" class="flex w-full justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Registrate</button>
      </div>
    </form>

  </div>
</div>
</div>
        </>
    );
};

export default Register;
