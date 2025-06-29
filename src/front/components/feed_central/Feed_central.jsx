import Modal1 from '../Modal';
import './Feed_central.css'
const Feed_central = () => {

    return (
        <>
            <div className="w-full max-w-sm min-w-[500px]">
                <div className="relative">
                    <input
                        className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        placeholder="UI Kits, Dashboards..."
                    />
                    <button
                        className="absolute top-1 right-1 flex items-center rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2">
                            <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                        </svg>

                        Search
                    </button>
                </div>
            </div>

            <div className='mt-4'>
                <span className='mx-2 text-white'>
                    🔥 Trending
                </span>
                <button className="rounded-full bg-gray-600 mx-2 py-2 px-4 text-white text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-blue-600 hover:border-slate-800 focus:text-white focus:bg-blue-600 focus:border-slate-800 active:bg-blue-600 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                    Outlined
                </button>
                <button className="rounded-full bg-gray-600 mx-2 py-2 px-4 text-white text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-blue-600 hover:border-slate-800 focus:text-white focus:bg-blue-600 focus:border-slate-800 active:bg-blue-600 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                    Outlined
                </button>
                <button className="rounded-full bg-gray-600 mx-2 py-2 px-4 text-white text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-blue-600 hover:border-slate-800 focus:text-white focus:bg-blue-600 focus:border-slate-800 active:bg-blue-600 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                    Outlined
                </button>
                <button className="rounded-full bg-gray-600 mx-2 py-2 px-4 text-white text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-blue-600 hover:border-slate-800 focus:text-white focus:bg-blue-600 focus:border-slate-800 active:bg-blue-600 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                    Outlined
                </button>
                <button className="rounded-full bg-gray-600 mx-2 py-2 px-4 text-white text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-blue-600 hover:border-slate-800 focus:text-white focus:bg-blue-600 focus:border-slate-800 active:bg-blue-600 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                    Outlined
                </button>
                <button className="rounded-full bg-gray-600 mx-2 py-2 px-4 text-white text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-blue-600 hover:border-slate-800 focus:text-white focus:bg-blue-600 focus:border-slate-800 active:bg-blue-600 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                    Outlined
                </button>
                <Modal1 />
            </div>

        </>
    )
}

export default Feed_central