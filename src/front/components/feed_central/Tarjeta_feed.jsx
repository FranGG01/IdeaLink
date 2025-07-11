import './Feed_central.css'
import './Tarjeta.css'
import { Avatar } from "@material-tailwind/react";
import Modal_postularse from './Modal_postularse';
import { Card, CardHeader, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import { useState } from 'react'

export default function Tarjeta({ project }) {

    const [isFavorite, setIsFavorite] = useState(project.is_favorite)

    const handleLike = async () => {
        const token = localStorage.getItem("jwt-token");
        const response = await fetch(`http://127.0.0.1:5000/api/favorites/${project.id}`, {
            method: isFavorite ? "DELETE" : "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        });

        if (response.ok) {
            setIsFavorite(!isFavorite)
        }
    }

    if (!project || !project.owner) return null;
    console.log("🧪 image_url:", project.image_url);

    return (
        <div className="tarjeta-container">
            <div className="tarjeta-aura"></div>

            <div className="tarjeta-particles">
                <div className="particle particle-1"></div>
                <div className="particle particle-2"></div>
                <div className="particle particle-3"></div>
            </div>

            <Card className="tarjeta-card">
                <div className="tarjeta-top-glow"></div>

                <div className="tarjeta-pattern"></div>

                <CardHeader floated={false} shadow={false} className="tarjeta-header">
                    <div className="tarjeta-user-info">
                        <div className="tarjeta-avatar-container">
                            <div className="tarjeta-avatar-aura"></div>
                            <Avatar
                                src={project?.owner?.avatar_url || "https://ui-avatars.com/api/?name=User"}
                                alt="avatar"
                                size="sm"
                                className="tarjeta-avatar"
                            />
                            <div className="tarjeta-status-indicator"></div>
                        </div>
                        <div>
                            <Typography variant="h6" className="tarjeta-username">
                                {project.owner?.username || "Anónimo"}
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
                                <div className="tarjeta-hashtag-shine"></div>
                                <span className="tarjeta-hashtag-text">#{tag.trim()}</span>
                            </span>
                        ))}
                    </div>
                </CardHeader>

                <CardBody className="tarjeta-body">
                    <p className="tarjeta-description">
                        {project.description}
                    </p>
                    {project.image_url && (
                        <div className="tarjeta-image-container">
                            <div className="tarjeta-image-frame"></div>
                            <img
                                src={`http://127.0.0.1:5000${project.image_url}`}
                                alt="imagen del proyecto"
                                className="tarjeta-image"
                            />
                            <div className="tarjeta-image-overlay"></div>

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
                        <button
                            className="tarjeta-action-btn tarjeta-like-btn"
                            onClick={handleLike}
                        >
                            <svg
                                className="tarjeta-icon"
                                fill={isFavorite ? "currentColor" : "none"}
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>

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