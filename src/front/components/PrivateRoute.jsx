import { Navigate, Outlet } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const PrivateRoute = () => {
    const { store } = useGlobalReducer();

    if (store.user === null) {
        // Se sabe que NO hay usuario
        return <Navigate to="/" replace />;
    }

    if (!store.user) {
        return <div className="text-white p-4">Verificando sesión...</div>;
    }

    return <Outlet />;
};

export default PrivateRoute;
