import Sidebarleft from "../components/sidebars/SidebarLeft"
import SidebarRight from "../components/sidebars/SidebarRight"
import User_perfil from "../components/User_perfil"
const Perfil = () => {
    return (
        <>
            <div className="flex flex-row min-h-screen bg-gray-900 text-white">
                <aside className="hidden lg:block lg:w-1/5 p-4 bg-gray-800">
                    <Sidebarleft />
                </aside>

                <main className="flex-1 p-4 bg-gray-900 overflow-y-auto h-screen scroll-hidden
">
                    <User_perfil />
                </main>

                <aside className="hidden xl:block xl:w-1/4 p-4 bg-gray-800">
                    <SidebarRight />
                </aside>
            </div>


        </>
    )
}
export default Perfil