// Este componente ha sido eliminado porque la edición de proyectos ya no está permitida.
import { useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL;

export default function EditProjectModal({ project, onClose, onSaved }) {
    const [title, setTitle] = useState(project.title || "");
    const [description, setDescription] = useState(project.description || "");
    const [hashtags, setHashtags] = useState(
        Array.isArray(project.hashtags) ? project.hashtags.join(", ") : (project.hashtags || "")
    );
    const [stackblitz, setStackblitz] = useState(project.stackblitz_url || "");
    const [isAccepting, setIsAccepting] = useState(!!project.is_accepting_applications);
    const [saving, setSaving] = useState(false);

    async function handleSave() {
        try {
            setSaving(true);
            const token = localStorage.getItem("jwt-token");
            const res = await fetch(`${API_BASE}/projects/${project.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title,
                    description,
                    hashtags, // el back normaliza a #tag, #tag2
                    stackblitz_url: stackblitz,
                    is_accepting_applications: isAccepting,
                }),
            });
            if (!res.ok) throw new Error(await res.text());
            const updated = await res.json();
            onSaved(updated);
            onClose();
        } catch (e) {
            alert("No se pudo guardar: " + (e?.message || e));
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="fixed inset-0 z-[200] bg-black/60 grid place-items-center p-4">
            <div className="w-full max-w-xl rounded-2xl bg-white dark:bg-neutral-900 p-5 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Editar proyecto</h3>
                    <button onClick={onClose} className="px-2 py-1 rounded border cursor-pointer">✕</button>
                </div>

                <div className="grid gap-3">
                    <label className="grid gap-1">
                        <span className="text-sm opacity-70">Título</span>
                        <input className="border rounded px-3 py-2" value={title} onChange={e => setTitle(e.target.value)} />
                    </label>

                    <label className="grid gap-1">
                        <span className="text-sm opacity-70">Descripción</span>
                        <textarea className="border rounded px-3 py-2 min-h-[100px]" value={description} onChange={e => setDescription(e.target.value)} />
                    </label>

                    <label className="grid gap-1">
                        <span className="text-sm opacity-70">Hashtags (coma o #)</span>
                        <input className="border rounded px-3 py-2" placeholder="#react, #flask" value={hashtags} onChange={e => setHashtags(e.target.value)} />
                    </label>

                    <label className="grid gap-1">
                        <span className="text-sm opacity-70">StackBlitz URL</span>
                        <input className="border rounded px-3 py-2" value={stackblitz} onChange={e => setStackblitz(e.target.value)} />
                    </label>

                    <label className="inline-flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={isAccepting} onChange={e => setIsAccepting(e.target.checked)} />
                        <span>Aceptando colaboraciones</span>
                    </label>
                </div>

                <div className="flex justify-end gap-2 mt-5">
                    <button className="px-4 py-2 rounded border cursor-pointer" onClick={onClose} disabled={saving}>Cancelar</button>
                    <button className="px-4 py-2 rounded bg-black text-white disabled:opacity-50 cursor-pointer" onClick={handleSave} disabled={saving}>
                        {saving ? "Guardando…" : "Guardar"}
                    </button>
                </div>
            </div>
        </div>
    );
}
