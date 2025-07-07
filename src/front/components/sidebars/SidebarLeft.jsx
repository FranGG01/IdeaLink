import React from "react";
import { Home, Folder, User, HelpCircle } from "lucide-react";
import Separator from "./Separator";
import { Link, useLocation } from "react-router-dom";
import Logo_dark from "../../assets/img/Logo_dark.png";
import { useNavigate } from "react-router-dom";
export default function SidebarLeft() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: "Dashboard", icon: Home, to: "/feed" },
    { label: "Perfil", icon: User, to: "/perfil" },
    { label: "Colaboraciones", icon: Folder, to: "/proyectos" },
    { label: "Sobre Nosotros", icon: User, to: "/about_us" },
    { label: "Centro de ayuda", icon: HelpCircle, to: "/soporte" },
  ];

  return (
    <><div className="h-30 flex items-start">
      <img className=" h-35 w-55 object-cover pb-18 " src={Logo_dark} alt="Your Company" />
    </div>

      <aside className="w-64 bg-[#1e293b] p-5  space-y-6 text-white mt-0">
        <nav className="space-y-3">
          {navItems.map(({ label, icon: Icon, to }) => (
            <Link
              to={to}
              key={label}
              className={`w-full flex items-center space-x-3 text-left p-2 rounded-md transition-colors duration-200 cursor-pointer ${location.pathname === to ? "bg-purple-700" : "hover:bg-purple-500/20"
                }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        <div className="pt-6">
          <Separator />
        </div>

        <div className="text-sm space-y-6 pt-6">
          <div className="flex items-center space-x-2 cursor-pointer hover:underline">
            <span className="w-2 h-2 bg-gray-400 rounded-full" />
            <p className="text-gray-300">Tecnología</p>
          </div>
          <div className="flex items-center space-x-2 cursor-pointer hover:underline">
            <span className="w-2 h-2 bg-yellow-400 rounded-full" />
            <p className="text-gray-300">Negocios</p>
          </div>
          <div className="flex items-center space-x-2 cursor-pointer hover:underline">
            <span className="w-2 h-2 bg-purple-400 rounded-full" />
            <p className="text-gray-300">Diseño</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/')}
          className="absolute bottom-4 left-4 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm"
        >
          Cerrar sesión
        </button>
      </aside>
    </>
  );
}
