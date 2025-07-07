import {
    Dialog, DialogHeader, DialogBody, DialogFooter,
    Button, Input, Typography, Textarea
} from "@material-tailwind/react";
import { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { createProject } from "../store";
import sdk from "@stackblitz/sdk";
import { useRef } from "react";


export default function Modal1() {
    const [open, setOpen] = useState(false);
    const { store, dispatch } = useGlobalReducer();
    const user = store.user;

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        hashtags: "",
        image_url: "",
        stackblitz_url: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        if (!user || !user.id) {
            alert("Debes iniciar sesión para crear un proyecto.");
            return;
        }

        if (!formData.title || !formData.description) {
            alert("El título y la descripción son obligatorios.");
            return;
        }

        try {
            const newProject = await createProject(formData, user);
            dispatch({ type: "add_project", payload: newProject });

            setFormData({ title: "", description: "", hashtags: "", image_url: "" });
            setOpen(false);
        } catch (err) {
            console.error("Error al crear proyecto:", err);
            alert("No se pudo crear el proyecto.");
        }
        sdk.embedProject(stackblitzRef.current, {
            title: formData.title || "IdeaLink Project",
            description: formData.description || "Proyecto generado desde IdeaLink",
            template: "javascript",
            files: {
                "index.html": "<h1>Bienvenido a IdeaLink</h1>",
                "index.js": "console.log('Hola desde StackBlitz');",
                "style.css": "body { font-family: sans-serif; background: #f4f4f4; }"
            }
        }, {
            openFile: "index.js",
            view: "editor",
            height: 500
        });

    };
    const stackblitzRef = useRef(null);

    return (
        <>
            <Button
                onClick={() => setOpen(true)}
                variant="filled"
                className="rounded-md bg-purple-700 mx-2 py-2 px-4 text-white text-sm shadow-sm shadow-white hover:bg-purple-500 hover:shadow-md cursor-pointer"
            >
                CREA TU IDEA
            </Button>

            <Dialog
                open={open}
                handler={setOpen}
                size="md"
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[800px] rounded-[1vw] bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm shadow-white"
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
                            <label htmlFor="title" className="text-sm font-semibold">Título</label>
                            <Input
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="rounded-md"
                                placeholder="Título aquí"
                            />
                        </div>

                        <div className="flex flex-col flex-1">
                            <label htmlFor="hashtags" className="text-sm font-semibold">Hashtags #</label>
                            <Input
                                id="hashtags"
                                name="hashtags"
                                value={formData.hashtags}
                                onChange={handleChange}
                                className="rounded-md"
                                placeholder="IA, Developer, FullStack"
                            />

                        </div>
                    </div>

                    <div className="flex flex-col space-y-1.5">
                        <label htmlFor="description" className="text-sm font-semibold">Descripción</label>
                        <Textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="rounded-md"
                            placeholder="Descripción aquí…"
                        />
                    </div>

                    <div className="flex flex-col space-y-1.5">
                        <label htmlFor="image_url" className="text-sm font-semibold">URL de imagen</label>
                        <Input
                            id="image_url"
                            name="image_url"
                            value={formData.image_url}
                            onChange={handleChange}
                            className="rounded-md"
                            placeholder="https://example.com/imagen.jpg"
                        />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <label htmlFor="image_url" className="text-sm font-semibold">URL de StackBlitz</label>
                        <Input
                            id="stackblitz_url"
                            name="StackBlitz_url"
                            value={formData.stackblitz_url}
                            onChange={handleChange}
                            className="rounded-md"
                            placeholder="StackBlitz URL (OPCIONAL)"
                        />

                    </div>

                </DialogBody>

                <DialogFooter>
                    <Button
                        fullWidth
                        variant="filled"
                        onClick={handleSubmit}
                        className="rounded-md bg-gray-600 py-2 px-4 text-white text-sm shadow-sm hover:bg-purple-700 hover:shadow-lg"
                    >
                        Guardar
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
