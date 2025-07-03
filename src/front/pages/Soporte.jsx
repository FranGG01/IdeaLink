import { useNavigate } from "react-router-dom";
import SupportPage from "../components/SupportPage"
const Soporte = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="flex flex-row min-h-screen bg-gray-900 text-white">
                <button
                    onClick={() => navigate("/feed")}
                    className="self-start mb-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                >
                    ← Volver
                </button>

                <main className="flex-1 p-4 bg-gray-900">
                    <SupportPage />
                </main>

            </div>


        </>
    )
}
export default Soporte