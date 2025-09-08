import React, { useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, User as UserIcon, Lock, ShieldCheck } from "lucide-react";
import Logo_dark from "../assets/img/Logo_dark.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE = import.meta.env.VITE_API_URL;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const strongPasswordChecks = [
  { key: "len8", test: (v) => v.length >= 8, label: "8+ caracteres" },
  { key: "upper", test: (v) => /[A-Z]/.test(v), label: "1 mayúscula" },
  { key: "num", test: (v) => /\d/.test(v), label: "1 número" },
  { key: "spec", test: (v) => /[^A-Za-z0-9]/.test(v), label: "1 carácter especial" },
];

function passwordScore(pw) {
  return strongPasswordChecks.reduce((acc, c) => acc + (c.test(pw) ? 1 : 0), 0);
}

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    password2: "",
    username: "",
    terms: false,
  });
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({});

  const score = useMemo(() => passwordScore(form.password), [form.password]);

  const errors = useMemo(() => {
    const e = {};
    if (!form.username || form.username.trim().length < 3) e.username = "Mínimo 3 caracteres.";
    if (!emailRegex.test(form.email)) e.email = "Introduce un correo válido.";
    if (!form.password) e.password = "La contraseña es obligatoria.";
    else if (score < 3) e.password = "Contraseña poco segura.";
    if (form.password2 !== form.password) e.password2 = "Las contraseñas no coinciden.";
    if (!form.terms) e.terms = "Debes aceptar los términos.";
    return e;
  }, [form, score]);

  const hasErrors = Object.keys(errors).length > 0;

  const onChange = (k) => (e) => {
    const val = k === "terms" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [k]: val }));
  };

  const onBlur = (k) => () => setTouched((t) => ({ ...t, [k]: true }));

  const handleRegister = async (e) => {
    e.preventDefault();
    setTouched({ username: true, email: true, password: true, password2: true, terms: true });
    if (hasErrors) return toast.error("Revisa los campos señalados.");

    try {
      setLoading(true);
      const resp = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email.trim(),
          password: form.password,
          username: form.username.trim(),
        }),
      });

      const data = await resp.json().catch(() => ({}));

      if (resp.ok) {
        toast.success("🎉 Usuario registrado correctamente", {
          onClose: () => navigate("/"),
        });
      } else {
        toast.error(data?.msg || "❌ Error al registrar usuario");
      }
    } catch {
      toast.error("❌ Error de red al registrar usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-[100svh] bg-gray-900 text-white
        px-4 py-4 sm:py-6
        flex justify-center
        overflow-y-auto
      "
    >
      <motion.div
        initial={{ opacity: 0, y: 8, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35 }}
        className="
          w-full 
          max-w-sm sm:max-w-md md:max-w-md lg:max-w-lg
          bg-gray-800 rounded-xl 
          p-4 sm:p-6 md:p-7 lg:p-8 
          shadow-[0_0_24px_#8b5cf6aa]
          max-h-[88svh] md:max-h-[90svh]
          overflow-y-auto
        "
      >
        {/* Header */}
        <div className="flex flex-col items-center gap-2 mb-4 sm:mb-5">
          <img
            src={Logo_dark}
            alt="IdeaLink Logo"
            className="object-contain h-12 sm:h-14 md:h-36"
          />
          <p className="text-xs text-gray-300/80 text-center px-2">
            Conecta, comparte y crea proyectos con IdeaLink
          </p>
        </div>

        <h2 className="text-center font-extrabold tracking-tight mb-5 text-lg sm:text-xl">
          REGISTRA TU CUENTA
        </h2>

        <form onSubmit={handleRegister} className="space-y-4" noValidate>
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300">
              Nombre de usuario
            </label>
            <div className="mt-1.5 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 opacity-70">
                <UserIcon size={16} />
              </span>
              <input
                id="username"
                type="text"
                value={form.username}
                onChange={onChange("username")}
                onBlur={onBlur("username")}
                autoComplete="username"
                required
                className={`pl-9 pr-3 py-2 w-full rounded-md bg-gray-700 text-white outline outline-1 placeholder:text-gray-400 text-sm ${touched.username && errors.username
                    ? "outline-red-500 focus:outline-red-500"
                    : "outline-gray-500 focus:outline-2 focus:outline-purple-500"
                  }`}
              />
            </div>
            {touched.username && errors.username && (
              <p className="mt-1 text-xs text-red-400">{errors.username}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Correo electrónico
            </label>
            <div className="mt-1.5 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 opacity-70">
                <Mail size={16} />
              </span>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={onChange("email")}
                onBlur={onBlur("email")}
                autoComplete="email"
                required
                className={`pl-9 pr-3 py-2 w-full rounded-md bg-gray-700 text-white outline outline-1 placeholder:text-gray-400 text-sm ${touched.email && errors.email
                    ? "outline-red-500 focus:outline-red-500"
                    : "outline-gray-500 focus:outline-2 focus:outline-purple-500"
                  }`}
              />
            </div>
            {touched.email && errors.email && (
              <p className="mt-1 text-xs text-red-400">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Contraseña
            </label>
            <div className="mt-1.5 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 opacity-70">
                <Lock size={16} />
              </span>
              <input
                id="password"
                type={showPw ? "text" : "password"}
                value={form.password}
                onChange={onChange("password")}
                onBlur={onBlur("password")}
                autoComplete="new-password"
                required
                className={`pl-9 pr-9 py-2 w-full rounded-md bg-gray-700 text-white outline outline-1 placeholder:text-gray-400 text-sm ${touched.password && errors.password
                    ? "outline-red-500 focus:outline-red-500"
                    : "outline-gray-500 focus:outline-2 focus:outline-purple-500"
                  }`}
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 opacity-80 hover:opacity-100"
                aria-label={showPw ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Strength bar */}
            <div className="mt-1.5">
              <div className="h-1.5 w-full bg-gray-700 rounded-md overflow-hidden">
                <div
                  className={`h-full rounded-md transition-all duration-300 ${["w-1/5", "w-2/5", "w-3/5", "w-4/5", "w-full"][score]
                    } ${score <= 2
                      ? "bg-red-500"
                      : score === 3
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                />
              </div>
              <div className="mt-2 grid grid-cols-2 gap-1 text-[11px] text-gray-300/80">
                {strongPasswordChecks.map((c) => (
                  <div key={c.key} className="flex items-center gap-1">
                    <ShieldCheck
                      size={11}
                      className={
                        c.test(form.password) ? "text-green-400" : "text-gray-500"
                      }
                    />
                    <span>{c.label}</span>
                  </div>
                ))}
              </div>
            </div>
            {touched.password && errors.password && (
              <p className="mt-1 text-xs text-red-400">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="password2" className="block text-sm font-medium text-gray-300">
              Repite la contraseña
            </label>
            <div className="mt-1.5 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 opacity-70">
                <Lock size={16} />
              </span>
              <input
                id="password2"
                type={showPw2 ? "text" : "password"}
                value={form.password2}
                onChange={onChange("password2")}
                onBlur={onBlur("password2")}
                autoComplete="new-password"
                required
                className={`pl-9 pr-9 py-2 w-full rounded-md bg-gray-700 text-white outline outline-1 placeholder:text-gray-400 text-sm ${touched.password2 && errors.password2
                    ? "outline-red-500 focus:outline-red-500"
                    : "outline-gray-500 focus:outline-2 focus:outline-purple-500"
                  }`}
              />
              <button
                type="button"
                onClick={() => setShowPw2((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 opacity-80 hover:opacity-100"
                aria-label={showPw2 ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPw2 ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {touched.password2 && errors.password2 && (
              <p className="mt-1 text-xs text-red-400">{errors.password2}</p>
            )}
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2">
            <input
              id="terms"
              type="checkbox"
              checked={form.terms}
              onChange={onChange("terms")}
              onBlur={onBlur("terms")}
              className="mt-1 h-4 w-4 rounded border-gray-500 bg-gray-700 text-purple-600 focus:ring-purple-500"
            />
            <label htmlFor="terms" className="text-xs sm:text-sm text-gray-300">
              Acepto los{" "}
              <a
                className="text-purple-400 hover:underline"
                href="/terminos"
                target="_blank"
                rel="noreferrer"
              >
                Términos y Condiciones
              </a>{" "}
              y la{" "}
              <a
                className="text-purple-400 hover:underline"
                href="/privacidad"
                target="_blank"
                rel="noreferrer"
              >
                Política de Privacidad
              </a>.
              {touched.terms && errors.terms && (
                <span className="block text-xs text-red-400 mt-1">
                  Debes aceptar los términos.
                </span>
              )}
            </label>
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full rounded-md px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${loading
                  ? "bg-purple-800 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700 cursor-pointer"
                }`}
            >
              {loading ? "Creando cuenta..." : "Regístrate"}
            </button>
          </div>

          {/* Login link */}
          <div className="pt-1 text-center text-xs sm:text-sm text-gray-300/90">
            ¿Ya tienes cuenta?{" "}
            <Link className="text-purple-400 hover:underline" to="/">
              Inicia sesión
            </Link>
          </div>
        </form>
      </motion.div>

      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        pauseOnFocusLoss
        pauseOnHover
        draggable
        theme="dark"
      />
    </div>
  );
};

export default Register;
