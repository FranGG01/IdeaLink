import Feed_central from "../components/feed_central/Feed_central"
import Sidebarleft from "../components/sidebars/SidebarLeft"
import SidebarRight from "../components/sidebars/SidebarRight"
import { useEffect, useState } from "react";
import { useLoading } from '../../context/LoadingContext';
import RotatingText from "../components/Loader/RotatingText";

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
            <div className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50 text-center p-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-200 mb-2">
                    CREATIVE
                </h1>
                <span className="text-xl sm:text-2xl md:text-3xl bg-cyan-700 text-white px-3 py-1 sm:py-2 rounded-lg">
                    <RotatingText
                        texts={[
                            "Components!",
                            "Thinking!",
                            "Coding!",
                            "Desings!",
                            "Webs!",
                            "Applications!",
                        ]}
                        mainClassName="overflow-hidden justify-center"
                        staggerFrom="last"
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-120%" }}
                        staggerDuration={0.025}
                        splitLevelClassName="overflow-hidden"
                        transition={{ type: "spring", damping: 30, stiffness: 400 }}
                        rotationInterval={2000}
                    />
                </span>
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