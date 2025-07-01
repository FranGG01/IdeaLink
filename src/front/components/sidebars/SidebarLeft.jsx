import React, { useState } from "react";
import { Home, Lightbulb, Search, Folder, User } from "lucide-react";
import Separator from "./Separator";
import { Link } from "react-router-dom";

export default function SidebarLeft() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const navItems = [
    { label: "Dashboard", icon: Home },
    { label: "Mis Ideas", icon: Lightbulb },
    { label: "Explorar", icon: Search },
    { label: "Proyectos", icon: Folder },
    { label: "Perfil", icon: User },
    { label: "Sobre Nosotros", icon: User, to: "/about_us" },
    { label: "Mensajes", icon: User, to: "/chat" },
  ];

  return (
    <aside className="w-64 bg-[#1e293b] p-6 space-y-6 text-white">
      <nav className="space-y-3">
        {navItems.map(({ label, icon: Icon, to }) => (
          <Link
            to={to}
            key={label}
            className={`w-full flex items-center space-x-3 text-left p-2 rounded-md transition-colors duration-200 cursor-pointer ${activeTab === label ? "bg-blue-600" : "hover:bg-blue-500/20"
              }`}
            onClick={() => setActiveTab(label)}
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
    </aside>
  );
}
