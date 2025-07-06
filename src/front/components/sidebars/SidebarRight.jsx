import { Code, Briefcase } from "lucide-react";
import Separator from "./Separator";
import Modal_chat from "../Modal_chat";
import { Avatar } from "@material-tailwind/react";
import "./Sidebar.css";


import React from "react";

export default function SidebarRight() {
  const users = [
    "Ana López",
    "Juan Pérez",
    "Laura Martin",
    "Juan Camilo",
    "Pedro Gómez",
    "Lucía Hernández",
    "Carlos Ruiz",
    "María Díaz",
  ];

  return (
    <>

      <div className="w-[300px] flex-row justify-center ms-15 mt-2 ">
        <div className="relative w-full flex justify-start">
          <Modal_chat />
          <input
            className="w-full bg-transparent placeholder:text-white text-sm border border-gray-100 rounded-md pl-3 py-2 transition duration-300 focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow text-white"
            placeholder="UI Kits, Dashboards..."
          />
          <button
            className="absolute top-1 right-1 flex items-center rounded-md bg-slate-800 py-1 px-2.5 text-sm text-white shadow-sm hover:bg-purple-700"
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
            </svg>
            Search
          </button>

        </div>
        <aside className="chat_sidebar w-[300px] bg-[#1e293b] p-2  text-white border border-gray-500 max-h-[360px] overflow-y-auto rounded-md">
          <div className="space-y-4 text-sm">
            {users.map((name, index) => (
              <React.Fragment key={`${name}-${index}`}>
                <Separator />

                <div
                  className="flex items-center justify-between cursor-pointer hover:bg-blue-500/10 px-2 py-1.5 rounded-md m-0"
                  onClick={() => console.log(`Clicked on ${name}`)}
                >
                  <div className="flex items-center space-x-3">
                    <Avatar
                      className="rounded-full w-[50px]"
                      src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/ct-assets/team-4.jpg"
                      alt="avatar"
                    />
                    <p className={name === "Juan Pérez" ? "font-semibold" : ""}>
                      {name}
                    </p>
                  </div>

                  <span
                    className={`w-2 h-2 rounded-full ${index === 0
                      ? "bg-green-400"
                      : index === 1
                        ? "bg-yellow-400"
                        : "bg-gray-400"
                      }`}
                  />
                </div>
                <Separator />
              </React.Fragment>
            ))}

          </div>
        </aside>
      </div >

    </>
  );
}