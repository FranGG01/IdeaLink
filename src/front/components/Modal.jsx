import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button,
    Input,
    Typography,
    Textarea,
} from "@material-tailwind/react";
import { useState } from "react";

export default function Modal1() {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Botón para abrir el modal */}
            <Button
                onClick={() => setOpen(true)}
                variant="filled"
                className="rounded-full bg-gray-600 mx-2 py-2 px-4 text-white text-sm shadow-sm hover:bg-blue-600 hover:shadow-lg"
            >
                CREA TU IDEA
            </Button>

            {/* Modal centrado en pantalla */}
            <Dialog
                open={open}
                handler={setOpen}
                size="md"
                className="fixed top-1/2 left-1/2 transform -translate-x-118 -translate-y-1/2 z-50 w-[800px] rounded-[1vw] bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm shadow-white"
            >
                <DialogHeader className="flex justify-between items-center">
                    <Typography variant="h6">Crea tu idea</Typography>
                    <Button className="text-white" variant="text" size="sm" onClick={() => setOpen(false)}>
                        ✕
                    </Button>
                </DialogHeader>

                <DialogBody className="space-y-4">
                    <Typography>Ingresa los datos de tu idea</Typography>

                    <div className="flex flex-wrap gap-4">
                        <div className="flex flex-col flex-1">
                            <label htmlFor="Titulo" className="text-sm font-semibold">
                                Título
                            </label>
                            <Input id="Titulo" className="rounded-full" placeholder="Título aquí" />
                        </div>

                        <div className="flex flex-col flex-1">
                            <label htmlFor="Hashtags" className="text-sm font-semibold">
                                Hashtags #
                            </label>
                            <Input id="Hashtags" className="rounded-full" placeholder="#innovación" />
                        </div>
                    </div>

                    <div className="flex flex-col space-y-1.5">
                        <label htmlFor="Descripcion" className="text-sm font-semibold">
                            Descripción
                        </label>
                        <Textarea id="Descripcion" className="rounded-[1vw]" placeholder="Descripción aquí…" />
                    </div>

                    <div className="flex flex-col space-y-1.5">
                        <label htmlFor="dropzone-file" className="text-sm font-semibold">
                            Imagen
                        </label>
                        <label
                            htmlFor="dropzone-file"
                            className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <svg
                                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                viewBox="0 0 20 16"
                                fill="none"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.2 5.0 4 4 0 0 0 5 13h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">Haz clic para subir</span> o arrastra la imagen
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                SVG, PNG, JPG o GIF (máx. 800×400)
                            </p>
                            <input
                                id="dropzone-file"
                                type="file"
                                className="hidden"
                                accept=".jpg, .jpeg, .png, .gif, .svg"
                            />
                        </label>
                    </div>
                </DialogBody>

                <DialogFooter>
                    <Button
                        fullWidth
                        variant="filled"
                        onClick={() => setOpen(false)}
                        className="rounded-full bg-gray-600 py-2 px-4 text-white text-sm shadow-sm hover:bg-blue-600 hover:shadow-lg"
                    >
                        Guardar
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
