
import './Feed_central.css'
import { Avatar } from "@material-tailwind/react";
import Modal_postularse from './Modal_postularse';
import Modal_leer_mas from './Modal_leer_mas';


export default function Tarjeta({ project }) {
    return (
        <Card className="w-full max-w-[48rem] rounded-[1vw] bg-gray-600 text-white shadow-lg px-6 py-4">
            {/* HEADER */}
            <CardHeader floated={false} shadow={false} className="flex items-center justify-between gap-4 bg-transparent p-0">
                <div className="flex items-center gap-4">
                    <Avatar
                        src={project.owner.avatar_url || "https://ui-avatars.com/api/?name=User"}
                        alt="avatar"
                        size="sm"
                        className="rounded-full"
                    />

                    <Typography variant="h6">{project.owner?.username || "Anónimo"}</Typography>
                </div>
                <div className="flex flex-wrap gap-2 justify-end">
                    {project.hashtags?.split(',').map((tag, i) => (
                        <span key={i} className="rounded-full bg-white text-black text-xs px-3 py-1">
                            #{tag.trim()}
                        </span>
                    ))}
                </div>
            </CardHeader>

            {/* DESCRIPTION */}
            <CardBody className="text-left px-0 pt-4">
                <p className="text-base">{project.description}</p>
                {project.image_url && (
                    <img
                        src={project.image_url}
                        alt="imagen del proyecto"
                        className="mt-4 w-full max-h-[250px] object-cover rounded-xl"
                    />
                )}
            </CardBody>

            </Card.Body>
            <Card.Footer className='flex justify-end p-1 gap-2'>
                <Modal_leer_mas />
                <Modal_postularse />
            </Card.Footer>
        </Card >
    );
}
