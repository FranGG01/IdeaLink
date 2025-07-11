import './Feed_central.css'
import './Tarjeta.css' // Importar el CSS específico
import { Avatar } from "@material-tailwind/react";
import Modal_postularse from './Modal_postularse';
import Modal_leer_mas from './Modal_leer_mas';
import { Card, CardHeader, CardBody, CardFooter, Typography } from "@material-tailwind/react";

export default function Tarjeta({ project }) {
    if (!project || !project.owner) return null;
    console.log("🧪 image_url:", project.image_url);

    return (
        <div className="tarjeta-container">
            {/* Efecto de luz de fondo animado */}
            <div className="tarjeta-aura"></div>

            {/* Partículas flotantes */}
            <div className="tarjeta-particles">
                <div className="particle particle-1"></div>
                <div className="particle particle-2"></div>
                <div className="particle particle-3"></div>
            </div>

            <Card className="tarjeta-card">
                {/* Efecto de brillo superior */}
                <div className="tarjeta-top-glow"></div>

                {/* Patrón de fondo sutil */}
                <div className="tarjeta-pattern"></div>

                {/* HEADER */}
                <CardHeader floated={false} shadow={false} className="tarjeta-header">
                    <div className="tarjeta-user-info">
                        <div className="tarjeta-avatar-container">
                            {/* Aura del avatar */}
                            <div className="tarjeta-avatar-aura"></div>
                            <Avatar
                                src={project?.owner?.avatar_url || "https://ui-avatars.com/api/?name=User"}
                                alt="avatar"
                                size="sm"
                                className="tarjeta-avatar"
                            />
                            {/* Indicador de estado con pulso */}
                            <div className="tarjeta-status-indicator"></div>
                        </div>
                        <div>
                            <Typography variant="h6" className="tarjeta-username">
                                {project.owner?.username || "Anónimo"}
                            </Typography>
                            <Typography variant="small" className="tarjeta-status">
                                <span className="tarjeta-online-dot"></span>
                                Activo ahora
                            </Typography>
                        </div>
                    </div>
                    <div className="tarjeta-hashtags">
                        {project.hashtags?.split(',').map((tag, i) => (
                            <span
                                key={i}
                                className="tarjeta-hashtag"
                                style={{ animationDelay: `${i * 0.1}s` }}
                            >
                                {/* Efecto de brillo al hacer hover */}
                                <div className="tarjeta-hashtag-shine"></div>
                                <span className="tarjeta-hashtag-text">#{tag.trim()}</span>
                            </span>
                        ))}
                    </div>
                </CardHeader>

                {/* DESCRIPTION */}
                <CardBody className="tarjeta-body">
                    <p className="tarjeta-description">
                        {project.description}
                    </p>
                    {project.image_url && (
                        <div className="tarjeta-image-container">
                            {/* Marco con gradiente */}
                            <div className="tarjeta-image-frame"></div>
                            <img
                                src={`http://127.0.0.1:5000${project.image_url}`}
                                alt="imagen del proyecto"
                                className="tarjeta-image"
                            />
                            {/* Overlay con efecto de cristal */}
                            <div className="tarjeta-image-overlay"></div>

                            {/* Efecto de partículas en la imagen */}
                            <div className="tarjeta-image-particles">
                                <div className="image-particle image-particle-1"></div>
                                <div className="image-particle image-particle-2"></div>
                                <div className="image-particle image-particle-3"></div>
                            </div>
                        </div>
                    )}
                </CardBody>

                <CardFooter className='tarjeta-footer'>
                    <div className="tarjeta-actions">
                        <button className="tarjeta-action-btn tarjeta-like-btn">
                            <svg className="tarjeta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <span className="tarjeta-count tarjeta-like-count">32</span>
                        </button>
                        <button className="tarjeta-action-btn tarjeta-comment-btn">
                            <svg className="tarjeta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <span className="tarjeta-count tarjeta-comment-count">8</span>
                        </button>
                        <button className="tarjeta-action-btn tarjeta-share-btn">
                            <svg className="tarjeta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                            </svg>
                            <span className="tarjeta-share-text">Compartir</span>
                        </button>
                    </div>
                    <div className="tarjeta-modal-container">
                        <Modal_postularse />
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}