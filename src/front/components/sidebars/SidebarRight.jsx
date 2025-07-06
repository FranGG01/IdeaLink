import { Code, Briefcase } from "lucide-react";
import Separator from "./Separator";
import Modal_chat from "../Modal_chat";
import { Avatar } from "@material-tailwind/react";
import "./Sidebar.css";


export default function SidebarRight() {
  const users = ["Ana López", "Juan Pérez", "Laura Martin", "Juan Camilo", "Pedro Gómez", "Lucía Hernández", "Carlos Ruiz", "María Díaz"];

  return (
    <>

      <aside className="chat_sidebar w-[300px] bg-[#1e293b] p-2 ms-20 text-white border-1 border-gray-500 max-h-[400px] overflow-y-auto rounded-md ">
        <input
          className="w-full bg-transparent placeholder:text-white text-sm border border-gray-100 rounded-md pl-3 py-2 transition duration-300 focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow text-white"
          placeholder="UI Kits, Dashboards..."
        />
        <div className="space-y-4 text-sm flex-row">
          {users.map((name, index) => (
            <>
              <Separator />
              <div
                key={name}
                className="flex-wrap items-center justify-between cursor-pointer hover:bg-blue-500/10 px-2 py-1.5 rounded-md m-0 "
                onClick={() => console.log(`Clicked on ${name}`)}
              >
                <div className="flex items-center space-x-3">
                  <Avatar className="rounded-full w-[50px]" src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/ct-assets/team-4.jpg" alt="avatar" />
                  <p className={name === "Juan Pérez" ? "font-semibold" : ""}>{name}</p>
                  <span
                    className={`w-2 h-2 rounded-full ${index === 0 ? "bg-green-400" : index === 1 ? "bg-yellow-400" : "bg-gray-400"
                      }`}
                  />
                </div>
              </div>
              <Separator />
            </>))}
          <div className="flex ">
            <Separator />
          </div>
        </div>
      </aside>
      <Modal_chat />
    </>
  );
}