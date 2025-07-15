import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'  // Global styles for your application
import { RouterProvider } from "react-router-dom";  // Import RouterProvider to use the router
import { router } from "./routes";  // Import the router configuration
import { StoreProvider } from './hooks/useGlobalReducer';  // Import the StoreProvider for global state management
import './index.css';
import { LoadingProvider } from "../context/LoadingContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Main = () => {


    return (
        <React.StrictMode>
            <LoadingProvider>
                <StoreProvider>
                    <RouterProvider router={router} />
                    <ToastContainer
                        position="bottom-right"
                        autoClose={3000}
                        pauseOnHover
                        theme="dark"
                    />
                </StoreProvider>
            </LoadingProvider>
        </React.StrictMode>

    );
}

// Render the Main component into the root DOM element.
ReactDOM.createRoot(document.getElementById('root')).render(<Main />)
