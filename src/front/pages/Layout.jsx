import ScrollToTop from "../components/ScrollToTop"
import  Login  from "../components/Login.jsx"
import '../index.css'; // Asegúrate de que esté en la misma carpeta

// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Layout = () => {
    return (
        <ScrollToTop>
           <Login />
        </ScrollToTop>
    )
}