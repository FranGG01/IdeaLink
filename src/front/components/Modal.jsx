import { useState } from "react";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button,
    Input,
    Checkbox,
    Typography,
    IconButton,
    Textarea,
} from "@material-tailwind/react";
import { Xmark } from "iconoir-react";

export default function Modal1() {
    const [open, setOpen] = useState(false);


    const handleOpen = (value) => setOpen(value);

    return (
        <>

            <Button
                onClick={() => setOpen(true)}
                className="rounded-full bg-gray-600 mx-2 py-2 px-4 text-white text-center text-sm transition-all shadow-sm hover:shadow-lg hover:text-white hover:bg-blue-600 hover:border-slate-800 focus:text-white focus:bg-blue-600 focus:border-slate-800 active:bg-blue-600 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
                CREA TU IDEA
            </Button>


            <Dialog
                size="sm"
                open={open}
                handler={handleOpen}
                className="p-4 w-[800px]"
            >
                <DialogHeader className="relative m-0 pr-10">
                    <Typography variant="h6">Crea tu idea</Typography>

                    {/* Botón ✕ que cierra */}
                    <Button
                        className="!absolute right-2 top-2 text-black"
                        onClick={() => setOpen(false)}
                    >
                        x
                    </Button>
                </DialogHeader>

                <DialogBody className="space-y-4">
                    <Typography>Ingresa los datos de tu idea</Typography>

                    <div className="space-y-1.5 flex gap-4">
                        <Typography
                            as="label"
                            htmlFor="text"
                            variant="small"
                            className="font-semibold"
                        >
                            Titulo
                        </Typography>
                        <Input id="Titulo" type="text" placeholder="Titulo aqui" />
                        <Typography
                            as="label"
                            htmlFor="number"
                            variant="small"
                            className="font-semibold"
                        >
                            Hashtags#
                        </Typography>
                        <Input id="Hashtags" type="number" placeholder="Hashtags aqui" />
                    </div>

                    <div className="space-y-1.5">
                        <Typography
                            as="label"
                            htmlFor="text"
                            variant="small"
                            className="font-semibold"
                        >
                            Descripcion
                        </Typography>
                        <Textarea placeholder="Descripcion aqui..." />
                    </div>

                    <div>   <Typography
                        as="label"
                        htmlFor="text"
                        variant="small"
                        className="font-semibold"
                    >
                        Imagen
                    </Typography> </div>

                    <div class="flex items-center justify-center w-full">

                        <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                </svg>
                                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                            </div>
                            <input id="dropzone-file" type="file" class="hidden" />
                        </label>
                    </div>
                </DialogBody>

                <DialogFooter>
                    {/* Botón dentro del modal que también cierra */}
                    <Button
                        fullWidth
                        onClick={() => setOpen(false)}
                        className="rounded-full bg-gray-600 mx-2 py-2 px-4 text-white text-center text-sm transition-all shadow-sm hover:shadow-lg hover:text-white hover:bg-blue-600 hover:border-slate-800 focus:text-white focus:bg-blue-600 focus:border-slate-800 active:bg-blue-600 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    >
                        Sign In
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}

