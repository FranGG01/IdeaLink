import React, { useEffect, useState } from "react";
import { Users, MailPlus, Handshake, Code, ExternalLink, GitBranch, Clock } from "lucide-react";
import "./Colaboraciones.css";
import ProyectoEmbed from "../StackblitzEmbed";

export default function Collaborations() {
    const [collabs, setCollabs] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        const fetchCollaborations = async () => {
            try {
                const token = localStorage.getItem("jwt-token");
                const res = await fetch("http://127.0.0.1:5000/api/my-collaborations", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (!res.ok) throw new Error("Error al cargar colaboraciones");

                const data = await res.json();
                setCollabs(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCollaborations();
    }, []);

    return (
        <div className="collaborations-container">
            <div className="collaborations-content">
                {/* Header Hero */}
                <div className="collaborations-header">
                    <div className="collaborations-header-icon">
                        <div className="collaborations-icon-container">
                            <Users className="w-8 h-8 text-purple-400" />
                        </div>
                        <h1 className="collaborations-title">
                            Colaboraciones
                        </h1>
                    </div>
                    <p className="collaborations-subtitle">
                        Gestiona tus proyectos colaborativos y accede a entornos de desarrollo compartidos
                    </p>
                </div>

                {/* Proyectos de colaboración */}
                <section className="collaborations-section">
                    <div className="collaborations-section-header">
                        <div className="collaborations-section-icon">
                            <GitBranch className="w-5 h-5 text-emerald-400" />
                        </div>
                        <h2 className="collaborations-section-title">Mis colaboraciones</h2>
                        <div className="collaborations-section-line"></div>
                    </div>

                    {collabs.length > 0 ? (
                        <div className="collaborations-grid">
                            {collabs.map((project, index) => (
                                <div
                                    key={project.id}
                                    onClick={() => setSelectedProject(project)}
                                    className="project-card"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="project-card-content">
                                        <div className="project-card-header">
                                            <div className="project-card-info">
                                                <div className="project-card-icon">
                                                    <Handshake className="w-5 h-5 text-purple-400" />
                                                </div>
                                                <div>
                                                    <h3 className="project-card-title">
                                                        {project.title}
                                                    </h3>
                                                </div>
                                            </div>
                                            {project.stackblitz_url && (
                                                <div className="project-card-status">
                                                    <Code className="w-4 h-4 text-emerald-400" />
                                                </div>
                                            )}
                                        </div>

                                        <p className="project-card-description">
                                            {project.description}
                                        </p>

                                        <div className="project-card-footer">
                                            <div className="project-card-indicator">
                                                <div className={`project-status-dot ${project.stackblitz_url ? 'active' : 'inactive'}`}></div>
                                                <span className="project-status-text">
                                                    {project.stackblitz_url ? "Entorno activo" : "Sin entorno"}
                                                </span>
                                            </div>
                                            <ExternalLink className="project-card-link" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="empty-state">
                            <div className="empty-state-icon">
                                <div className="empty-state-icon-container">
                                    <Users className="w-16 h-16 text-white/40" />
                                </div>
                            </div>
                            <h3 className="empty-state-title">
                                No tienes colaboraciones activas
                            </h3>
                            <p className="empty-state-description">
                                Cuando participes en proyectos colaborativos, aparecerán aquí para que puedas acceder a ellos fácilmente.
                            </p>
                        </div>
                    )}
                </section>

                {/* Editor de código */}
                {selectedProject?.stackblitz_url && (
                    <section className="code-editor-section">
                        <div className="code-editor-header">
                            <div className="code-editor-icon">
                                <Code className="w-5 h-5 text-blue-400" />
                            </div>
                            <h2 className="code-editor-title">Editor de código</h2>
                            <div className="code-editor-line"></div>
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="code-editor-close"
                            >
                                <span>Cerrar</span>
                            </button>
                        </div>

                        <div className="code-editor-container">
                            <div className="code-editor-wrapper">
                                <div className="code-editor-toolbar">
                                    <div className="code-editor-dots">
                                        <div className="code-editor-dot red"></div>
                                        <div className="code-editor-dot yellow"></div>
                                        <div className="code-editor-dot green"></div>
                                    </div>
                                    <span className="code-editor-name">{selectedProject.title}</span>
                                    <a
                                        href={selectedProject.stackblitz_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="code-editor-external"
                                    >
                                        <ExternalLink className="w-3 h-3" />
                                        Abrir en nueva pestaña
                                    </a>
                                </div>
                                <ProyectoEmbed
                                    className="w-full h-[80vh] border rounded-md"
                                    stackblitzUrl={selectedProject.stackblitz_url}
                                    title={selectedProject.title}
                                />

                            </div>
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}