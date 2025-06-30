import { useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import '../index.css';

export const Layout = () => {


    return (
        <ScrollToTop>
            <div>
                <Outlet />
            </div>
        </ScrollToTop>
    );
};