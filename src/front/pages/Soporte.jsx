import { useNavigate } from "react-router-dom";
import SupportPage from "../components/SupportPage"
const Soporte = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="flex flex-row min-h-screen bg-gray-900 text-white">

                <main className="flex-1 p-4 bg-gray-900">
                    <SupportPage />
                </main>

            </div>


        </>
    )
}
export default Soporte