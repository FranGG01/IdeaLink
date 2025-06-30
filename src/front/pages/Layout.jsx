import { useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import '../index.css';

export const Layout = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/Feed") {
            document.body.classList.add("feed-route");
        } else {
            document.body.classList.remove("feed-route");
        }
    }, [location.pathname]);

    return (
        <ScrollToTop>
            <div>
                <Outlet />
            </div>
        </ScrollToTop>
    );
};