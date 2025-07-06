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


export default function Modal_postularse() {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Botón para abrir el modal */}
            <Button
                onClick={() => setOpen(true)}
                variant="filled"
                className="rounded-md  mx-2 py-2 px-4 text-white text-sm shadow-sm h-[40px] bg-purple-700  hover:bg-purple-500  "
            >
                Postularse
            </Button>

            {/* Modal centrado en pantalla */}
            <Dialog
                open={open}
                handler={setOpen}
                size="md"
                className="fixed top-1/2 left-1/2 transform -translate-x-118 -translate-y-1/2 z-50 w-[800px] rounded-[1vw] bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm shadow-white"
            >
                <DialogHeader className="flex flex-col gap-4">
                    <p>aqui va el avatar</p>
                </DialogHeader>

                <DialogBody className="space-y-4">
                    <Typography>Ingresa los datos de tu idea</Typography>

                    <div className="flex flex-col space-y-1.5">
                        <label htmlFor="Descripcion" className="text-sm font-semibold">
                            Descripción
                        </label>
                        <Textarea id="Descripcion" className="rounded-md" placeholder="Descripción aquí…" />
                    </div>


                </DialogBody>

                <DialogFooter>
                    <Button
                        fullWidth
                        variant="filled"
                        onClick={() => setOpen(false)}
                        className="rounded-md bg-gray-600 py-2 px-4 text-white text-sm shadow-sm hover:bg-purple-700 hover:shadow-lg"
                    >
                        Postularse
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}