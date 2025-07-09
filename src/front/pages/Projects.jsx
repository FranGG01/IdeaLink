import Sidebarleft from "../components/sidebars/SidebarLeft"
import SidebarRight from "../components/sidebars/SidebarRight"
import Collaborations from "../components/Colaboraciones"
const Projects = () => {
    return (
        <>
            <div className="flex flex-row min-h-screen bg-gray-900 text-white">
                <aside className="hidden lg:block lg:w-1/5 p-4 bg-gray-800">
                    <Sidebarleft />
                </aside>

                <main className="flex-1 p-4 bg-gray-900 overflow-y-auto h-screen scroll-hidden">
                    <Collaborations />
                </main>

                <aside className="hidden xl:block xl:w-1/4 p-4 bg-gray-800">
                    <SidebarRight />
                </aside>
            </div>


        </>
    )
}
export default Projects