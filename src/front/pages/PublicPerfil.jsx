import AddFriendButton from "../components/AddFriendButton";

import Sidebarleft from "../components/sidebars/SidebarLeft";
import SidebarRight from "../components/sidebars/SidebarRight";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Tarjeta from "../components/feed_central/Tarjeta_feed";

const API_BASE = import.meta.env.VITE_API_URL;

export default function PublicPerfil() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        async function fetchUser() {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`${API_BASE}/user/${userId}`);
                if (!res.ok) throw new Error("Usuario no encontrado");
                const data = await res.json();
                setUser(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        async function fetchProjects() {
            try {
                const res = await fetch(`${API_BASE}/projects`);
                if (res.ok) {
                    const data = await res.json();
                    // Filtrar proyectos por owner_id
                    const filtered = data.filter(p => p.owner_id == userId);
                    setProjects(filtered);
                }
            } catch {}
        }
        fetchUser();
        fetchProjects();
    }, [userId]);

    return (
        <div className="flex flex-row min-h-screen bg-gray-900 text-white">
            <aside className="hidden lg:block lg:w-1/5 p-4 bg-gray-800">
                <Sidebarleft />
            </aside>

            <main className="flex-1 p-4 bg-gray-900 overflow-y-auto h-screen scroll-hidden">
                {loading && <div className="text-white">Cargando perfil...</div>}
                {error && <div className="text-red-400">{error}</div>}
                {user && (
                    <>
                    {/* Cabecera perfil público */}
                    <div className="flex flex-col items-center bg-[#1e293b] text-white p-6 rounded-2xl w-full max-w-4xl mx-auto">
                        <div className="w-full bg-gradient-to-r from-pink-500 to-purple-500 h-39 rounded-t-2xl relative">
                            {user.banner_url && (
                                <img
                                    src={user.banner_url}
                                    alt="Banner"
                                    className="w-full h-full object-cover rounded-t-2xl absolute inset-0"
                                />
                            )}
                            {/* Botón agregar amigo */}
                            <div className="absolute top-4 right-4">
                                <AddFriendButton receiverId={user.id} />
                            </div>
                            <img
                                src={user.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username || "User")}`}
                                alt={user.username || "avatar"}
                                className="w-35 h-35 rounded-full border-4 border-white absolute -bottom-12 left-1/2 transform -translate-x-1/2 object-cover"
                            />
                        </div>
                        <div className="grid justify-center mt-16 px-6 w-full">
                            <h2 className="flex justify-center text-3xl font-bold">{user.username}</h2>
                            <p className="flex justify-center text-sm text-gray-400">{user.role}</p>
                            <p className="flex justify-center mt-2 text-sm">{user.bio}</p>
                            <div className="flex justify-center gap-6 mt-4 text-sm text-gray-400">
                                <span>{user.location}</span>
                            </div>
                        </div>
                    </div>

                    {/* Proyectos del usuario */}
                    <div className="mt-8 space-y-4 px-4 flex flex-col items-center w-full max-w-4xl mx-auto">
                        <h3 className="text-xl font-bold mb-4">Proyectos de {user.username}</h3>
                        {projects.length === 0 ? (
                            <p className="text-white">Este usuario aún no tiene proyectos publicados.</p>
                        ) : (
                            projects.map((project) => (
                                <Tarjeta
                                    key={project.id}
                                    project={project}
                                    userFavorites={[]}
                                    setUserFavorites={() => {}}
                                />
                            ))
                        )}
                    </div>
                    </>
                )}
            </main>

            <aside className="hidden xl:block xl:w-1/4 p-4 bg-gray-800">
                <SidebarRight />
            </aside>
        </div>
    );
}
