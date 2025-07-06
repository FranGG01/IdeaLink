import Modal1 from '../Modal';
import './Feed_central.css'
import Tarjeta from './Tarjeta_feed'
import useGlobalReducer from '../../hooks/useGlobalReducer';
import { useEffect } from 'react';

const Feed_central = () => {
    const { store, dispatch } = useGlobalReducer();

    useEffect(() => {
        fetch("http://127.0.0.1:5000/api/projects")
            .then(res => res.json())
            .then(data => dispatch({ type: 'set_projects', payload: data }))
            .catch(err => console.error("Error al obtener ideas:", err))
    }, [dispatch]);

    return (
        <>
            <div className="w-full flex justify-center mt-2  ">
                <div className="w-full  flex flex-col items-center gap-4 ">

                    <div className="relative w-full">
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

                    {/* FILTROS */}
                    <div className="flex flex-wrap justify-center gap-2">
                        <span className="text-white">🔥 Trending</span>
                        {['IA', 'Startup', 'Sostenible', 'Recientes', 'Populares', 'Siguiendo'].map((item, i) => (
                            <button
                                key={i}
                                className="rounded-md bg-gray-600 py-2 px-4 text-white text-sm hover:bg-purple-700 focus:bg-purple-700 active:bg-purple-700 transition-all"
                            >
                                {item}
                            </button>
                        ))}
                        <Modal1 />
                    </div>
                </div>
            </div>


            <div className="mt-4 px-4 flex flex-col items-center overflow-y-auto space-y-4 max-h-[calc(100vh-150px)] ocultar-scroll">
                {store.projects && store.projects.map((project, index) => (
                    <Tarjeta key={index} project={project} />
                ))}

            </div>
        </>
    );
}

export default Feed_central;
