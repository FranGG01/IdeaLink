import { Avatar, Card, Typography, Button, CardBody, CardFooter, CardHeader } from "@material-tailwind/react";

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

            {/* FOOTER */}
            <CardFooter className="flex justify-end gap-3 mt-4 p-0">
                <Button variant="outlined" className="text-white border-white hover:bg-gray-700">
                    Learn More
                </Button>
                {project.is_accepting_applications && (
                    <Button className="bg-purple-700 hover:bg-purple-800">Postularse</Button>
                )}
            </CardFooter>
        </Card>
    );
}
