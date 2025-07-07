import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import Tarjeta from "./feed_central/Tarjeta_feed";

const User_perfil = () => {
    const { store, dispatch } = useGlobalReducer();
    const user = store.user;

    const [userProjects, setUserProjects] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        username: user?.username || "",
        role: user?.role || "",
        location: user?.location || "",
        bio: user?.bio || "",
        avatar_url: user?.avatar_url || "",
        banner_url: user?.banner_url || "",
    });


    useEffect(() => {
        const fetchUserProjects = async () => {
            const token = localStorage.getItem("jwt-token");
            try {
                const res = await fetch("http://127.0.0.1:5000/api/my-projects", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await res.json();
                setUserProjects(data);
            }
            catch (error) {
                console.error("❌ Error al cargar proyectos del usuario:", error);
            }
        };
        fetchUserProjects();
    }, []);

    return (

        <>
            <div
                className="flex flex-col items-center bg-[#1e293b] text-white p-6 rounded-2xl w-full max-w-4xl mx-auto"

            >
                <div className="w-full bg-gradient-to-r from-pink-500 to-purple-500 h-39 rounded-t-2xl relative">
                    <button
                        onClick={() => setEditMode(true)}
                        className="absolute top-4 right-4 bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700 transition"
                    >
                        Editar perfil
                    </button>

                    <img
                        src={user?.avatar_url || "https://ui-avatars.com/api/?name=User"}
                        alt={user?.username || "avatar"}
                        className="w-35 h-35 rounded-full border-4 border-white absolute -bottom-12 left-1/2 transform -translate-x-1/2"
                    />
                </div>
                <div className="grid justify-center mt-16 px-6 w-full">
                    <h2 className=" flex justify-center text-3xl font-bold">{user?.username || "Usuario"}</h2>
                    <p className="flex justify-center text-sm text-gray-400">{user?.role}</p>
                    <p className="flex justify-center mt-2 text-sm">
                        {user?.bio || "Escribe algo sobre ti..."}
                    </p>


                    <div className="flex justify-center  gap-6 mt-4 text-sm text-gray-400">
                        <span>{user?.email} </span>
                        <span>{user?.location || "Ubicación no definida"}</span>
                    </div>
                </div>

            </div>

            {editMode && (
                <div className="bg-gray-800 text-white p-4 rounded-lg mt-6 w-full max-w-2xl mx-auto space-y-4">
                    {["username", "role", "location", "bio", "avatar_url", "banner_url"].map((field) => (
                        <div key={field}>
                            <label className="block mb-1 capitalize">{field.replace("_", " ")}</label>
                            <input
                                className="w-full p-2 rounded bg-gray-700 text-white"
                                type="text"
                                value={formData[field]}
                                onChange={(e) =>
                                    setFormData({ ...formData, [field]: e.target.value })
                                }
                            />
                        </div>
                    ))}

                    <div className="flex gap-4 mt-4 justify-end">
                        <button
                            onClick={() => setEditMode(false)}
                            className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={async () => {
                                const token = localStorage.getItem("jwt-token");
                                try {
                                    const res = await fetch("http://127.0.0.1:5000/api/profile", {
                                        method: "PUT",
                                        headers: {
                                            "Content-Type": "application/json",
                                            "Authorization": `Bearer ${token}`,
                                        },
                                        body: JSON.stringify(formData),
                                    });

                                    const updatedUser = await res.json();
                                    if (res.ok) {
                                        dispatch({ type: "set_user", payload: updatedUser });
                                        setEditMode(false);
                                    } else {
                                        alert("Error al guardar perfil");
                                    }
                                } catch (err) {
                                    console.error("❌ Error al guardar perfil:", err);
                                }
                            }}
                            className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700"
                        >
                            Guardar cambios
                        </button>
                    </div>
                </div>
            )}

            <div className="flex gap-6 mt-6 border-b border-gray-700 w-full px-6">
                <button className="pb-2 border-b-2 border-white">Mis Ideas</button>
                <button className="pb-2 text-gray-400 hover:text-white">Favoritos</button>
            </div>
            <div className="mt-8 space-y-4 px-4 flex flex-col items-center">
                {userProjects.length === 0 ? (
                    <p className="text-white">Aún no tienes proyectos publicados.</p>
                ) : (
                    userProjects.map((project, index) => (
                        <Tarjeta key={index} project={project} />
                    ))
                )}
            </div>
        </>
    );

}

export default User_perfil