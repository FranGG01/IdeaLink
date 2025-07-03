import { Code, Briefcase } from "lucide-react";
import Separator from "./Separator";
import Modal_chat from "../Modal_chat";

export default function SidebarRight() {
  const users = ["Ana López", "Juan Pérez", "Laura Martin"];

  return (
    <>
      <aside className="w-64 bg-[#1e293b] p-8 space-y-10 text-white">
        <div className="space-y-4 text-sm">
          {users.map((name, index) => (
            <div
              key={name}
              className="flex items-center justify-between cursor-pointer hover:bg-blue-500/10 px-2 py-1.5 rounded-md"
              onClick={() => console.log(`Clicked on ${name}`)}
            >
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-gray-500" />
                <p className={name === "Juan Pérez" ? "font-semibold" : ""}>{name}</p>
              </div>
              <span
                className={`w-2 h-2 rounded-full ${index === 0 ? "bg-green-400" : index === 1 ? "bg-yellow-400" : "bg-gray-400"
                  }`}
              />
            </div>
          ))}
        </div>




      </aside>
      <Modal_chat />
    </>
  );
}
