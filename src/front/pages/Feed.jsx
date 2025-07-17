import Feed_central from "../components/feed_central/Feed_central"
import Sidebarleft from "../components/sidebars/SidebarLeft"
import SidebarRight from "../components/sidebars/SidebarRight"

const Feed = () => {

    return (
        <>
            <div className="flex flex-row h-screen bg-gray-900 text-white">
                <aside className="hidden lg:block lg:w-1/5 p-4 bg-gray-800">
                    <Sidebarleft />
                </aside>

                <main className="flex-1 p-0 bg-gray-900 overflow-hidden">
                    <div className="h-full overflow-y-hidden p-4 pt-4 scroll-hidden">
                        <Feed_central />
                    </div>
                </main>

                <aside className="hidden xl:block xl:w-1/4 p-4 bg-gray-800">
                    <SidebarRight />
                </aside>
            </div>
        </>
    )
}
export default Feed