import { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../store';
import logo from '../assets/img/Logo.png';
import Register from './Register';
import Carousel from './carrusel';



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
      <div className="Login w-full flex justify-center px-4">
        <div className="flex flex-col justify-center px-6 py-12 lg:px-8 h-auto lg:h-[800px] w-full max-w-[600px] mt-15 shadow-2xl shadow-purple-500/60 bg-white">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img className="mx-auto h-50" src={logo} alt="Your Company" />
            <h2 className="mt-2 text-center text-2xl/9 font-bold tracking-tight text-purple-600">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
                <div className="mt-2">
                  <input
                    type="email"
                    value={email}
                    onChange={handleInputChange}
                    name="email"
                    id="email"
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-purple-600 hover:text-indigo-500">Forgot password?</a>
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
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus:outline-2 focus:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm/6 text-gray-500">
              Not a member?{" "}
              <Link to="/register" className="font-semibold text-purple-600 hover:text-indigo-500">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>

    </>
  )
}

export default Login;