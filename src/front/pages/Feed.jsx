import Feed_central from "../components/feed_central/Feed_central"
import Sidebarleft from "../components/sidebars/SidebarLeft"
import SidebarRight from "../components/sidebars/SidebarRight"
import { useEffect, useState } from "react";
import { useLoading } from '../../context/LoadingContext';
import CircularText from '../components/Loader/CircularText';

const Feed = () => {
    const [initialLoading, setInitialLoading] = useState(false);
    const { isLoading } = useLoading();

    useEffect(() => {
        const alreadyVisited = localStorage.getItem("hasVisitedFeed");

        if (!alreadyVisited) {
            setInitialLoading(true);
            const timer = setTimeout(() => {
                setInitialLoading(false);
                localStorage.setItem("hasVisitedFeed", "true");
            }, 2000);

            return () => clearTimeout(timer);
        } else {
            setInitialLoading(false);
        }
    }, []);


    if (initialLoading || isLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-black">
                <CircularText
                    text="Loading*Big*Dreams*"
                    onHover="speedUp"
                    spinDuration={20}
                    className="custom-class"
                />
            </div>
        );
    }

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