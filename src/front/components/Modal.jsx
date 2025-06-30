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
            <Button
                onClick={() => setOpen(true)}
                variant="filled"
                className="rounded-full bg-gray-600 mx-2 py-2 px-4 text-white text-sm shadow-sm hover:bg-blue-600 hover:shadow-lg"
            >
                CREA TU IDEA
            </Button>
            <div className="flex justify-center">
                <Dialog open={open} handler={setOpen} className="w-[800px] top-5">
                    <DialogHeader className="flex justify-between items-center">
                        <Typography variant="h6">Crea tu idea</Typography>
                        <Button variant="text" size="sm" onClick={() => setOpen(false)}>
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
                                <Input id="Titulo" placeholder="Título aquí" />
                            </div>

                            <div className="flex flex-col flex-1">
                                <label htmlFor="Hashtags" className="text-sm font-semibold">
                                    Hashtags #
                                </label>
                                <Input id="Hashtags" placeholder="#innovación" />
                            </div>
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <label htmlFor="Descripcion" className="text-sm font-semibold">
                                Descripción
                            </label>
                            <Textarea id="Descripcion" placeholder="Descripción aquí…" />
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <label
                                htmlFor="dropzone-file"
                                className="text-sm font-semibold"
                            >
                                Imagen
                            </label>
                            <label
                                htmlFor="dropzone-file"
                                className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                            >
                                <svg
                                    className="w-8 h-8 mb-4 text-gray-500"
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
                                <p className="mb-2 text-sm text-gray-500">
                                    <span className="font-semibold">Haz clic para subir</span> o
                                    arrastra la imagen
                                </p>
                                <p className="text-xs text-gray-500">
                                    SVG, PNG, JPG o GIF (máx. 800×400)
                                </p>
                                <input id="dropzone-file" type="file" className="hidden" />
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
            </div>
        </>
    );
}


