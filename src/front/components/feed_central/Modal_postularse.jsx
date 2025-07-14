import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button,
    Textarea,
    Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { UserCircle } from "lucide-react";
import { toast } from "react-toastify";

export default function Modal_postularse({ projectId }) {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

    const handleOpen = () => setOpen((prev) => !prev);

    const handleSubmit = async () => {
        console.log("🧪 Enviando postulación para projectId:", projectId);
        const token = localStorage.getItem("jwt-token");

        try {
            const res = await fetch("http://127.0.0.1:5000/api/applications", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    message,
                    project_id: projectId,
                }),
            });

            if (!res.ok) throw new Error("Error al enviar");

            toast.success("🎉 Postulación enviada");
            setMessage("");
            setOpen(false);
        } catch (err) {
            toast.error("❌ Error al postularse");
            console.error(err);
        }
    };

    return (
        <>
            <Button
                onClick={handleOpen}
                className="rounded-md mx-2 py-2 px-4 text-white text-sm shadow-sm bg-purple-700 hover:bg-purple-500 transition cursor-pointer"
            >
                Postularse
            </Button>

            <Dialog
                open={open}
                handler={handleOpen}
                size="md"
                className="z-[9999] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[800px] rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-2xl"
            >
                <DialogHeader className="flex items-center gap-4 border-b border-gray-200 dark:border-gray-700 pb-4">
                    <div className="bg-gradient-to-br from-purple-500 to-blue-500 p-1 rounded-full">
                        <UserCircle className="w-12 h-12 text-white" />
                    </div>
                    <div>
                        <Typography variant="h5" className="text-lg font-semibold">
                            ¿Quieres unirte al proyecto?
                        </Typography>
                        <Typography variant="small" className="text-gray-500 dark:text-gray-400">
                            Cuéntale al creador por qué deberías formar parte.
                        </Typography>
                    </div>
                </DialogHeader>

                <DialogBody className="pt-6 space-y-4">
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="descripcion" className="text-sm font-medium text-gray-800 dark:text-gray-200">
                            ¿Qué puedes aportar?
                        </label>
                        <Textarea
                            id="descripcion"
                            autoFocus
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="p-2 rounded-md border border-gray-300 dark:border-gray-700 min-h-[120px] focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                            placeholder="Ej: Soy frontend con experiencia en React y me encantaría ayudar con la interfaz."
                        />
                    </div>
                </DialogBody>

                <DialogFooter className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Button
                        type="button"
                        onClick={handleSubmit}
                        className="bg-purple-700 hover:bg-purple-600 text-white rounded-md py-2 px-4 text-sm font-medium transition cursor-pointer"
                    >
                        Enviar postulación
                    </Button>

                </DialogFooter>
            </Dialog>
        </>
    );
}
