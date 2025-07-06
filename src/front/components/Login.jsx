import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { login } from '../store';
import Logo_dark from '../assets/img/Logo_dark.png';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
      navigate('/feed')
    } catch (error) {
      alert("Error al iniciar sesión: " + error.message);
    }
  };

  return (
    <>
      <div className="Login w-full flex  justify-center bg-gray-900 text-white">
        <div className="flex flex-col justify-center px-6 py-12 lg:px-8 h-auto lg:h-[800px] w-full max-w-[600px]  shadow-2xl shadow-purple-500/60 bg-gray-800 rounded-lg">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img className="mx-auto h-65" src={Logo_dark} alt="Your Company" />
            <h2 className="mt-2 text-center text-2xl/9 font-bold tracking-tight text-white">
              Inicia sesión en tu cuenta
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm mb-20">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-300">Dirección de correo electrónico</label>
                <div className="mt-2">
                  <input
                    type="email"
                    value={email}
                    onChange={handleInputChange}
                    name="email"
                    id="email"
                    required
                    className="block w-full rounded-md bg-gray-700 px-3 py-1.5 text-base text-white outline outline-1 outline-gray-500 placeholder:text-gray-400 focus:outline-2 focus:outline-purple-500 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm/6 font-medium text-gray-300">Contraseña</label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-purple-400 hover:text-purple-300">¿Has olvidado tu contraseña?</a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    type="password"
                    value={password}
                    onChange={handleInputChange}
                    name="password"
                    id="password"
                    required
                    className="block w-full rounded-md bg-gray-700 px-3 py-1.5 text-base text-white outline outline-1 outline-gray-500 placeholder:text-gray-400 focus:outline-2 focus:outline-purple-500 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs cursor-pointer hover:bg-purple-500 focus:outline-2 focus:outline-purple-500"
                >
                  Iniciar sesión
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm/6 text-gray-400">
              ¿Aún no eres miembro?{" "}
              <Link to="/register" className="font-semibold text-purple-400 hover:text-purple-300">
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
