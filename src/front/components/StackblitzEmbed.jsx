import { useEffect, useState } from "react";
import sdk from "@stackblitz/sdk";

const ProyectoEmbed = ({ stackblitzUrl, title = "Proyecto" }) => {
    const [stackblitzId, setStackblitzId] = useState(null);

    const extractStackblitzId = (url) => {
        const match = url.match(/stackblitz\.com\/edit\/([^?]+)/);
        return match ? match[1] : null;
    };

    useEffect(() => {
        if (stackblitzUrl) {
            const id = extractStackblitzId(stackblitzUrl);
            setStackblitzId(id);
        }
    }, [stackblitzUrl]);

    useEffect(() => {
        if (stackblitzId) {
            setTimeout(() => {
                sdk.embedProject(`stackblitz-editor-${stackblitzId}`, {
                    title,
                    description: "Editor simulado",
                    template: "javascript",
                    files: {
                        "index.js": `console.log("Hola desde ${title}");`,
                        "index.html": `<h1>Bienvenido a ${title}</h1>`
                    },
                });
            }, 100);
        }
    }, [stackblitzId, title]);

    return (
        <div className="w-full h-[90vh]">
            <div
                id={`stackblitz-editor-${stackblitzId}`}
                className="w-full h-full rounded-xl overflow-hidden"
            />
        </div>
    );
};

export default ProyectoEmbed;
