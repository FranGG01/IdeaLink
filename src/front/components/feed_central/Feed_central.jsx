import Modal1 from '../Modal';
import './Feed_central.css'
import Tarjeta from './Tarjeta_feed'
const Feed_central = () => {

    return (

        <>
            <div className="w-full flex justify-center mt-6  ">
                <div className="w-full  flex flex-col items-center gap-4 ">

                    <div className="relative w-full">
                        <input
                            className="w-full bg-transparent placeholder:text-white text-sm border border-gray-100 rounded-md pl-3 py-2 transition duration-300 focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow text-white"
                            placeholder="UI Kits, Dashboards..."
                        />
                        <button
                            className="absolute top-1 right-1 flex items-center rounded-md bg-slate-800 py-1 px-2.5 text-sm text-white shadow-sm hover:bg-slate-700"
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
                                className="rounded-md bg-gray-600 py-2 px-4 text-white text-sm hover:bg-blue-600 transition-all shadow-sm"
                            >
                                {item}
                            </button>
                        ))}
                        <Modal1 />
                    </div>
                </div>
            </div>

            <div className="mt-8 space-y-4 px-4 flex flex-col items-center">
                <Tarjeta />
                <Tarjeta />
                <Tarjeta />
            </div>
        </>
    );

}

export default Feed_central