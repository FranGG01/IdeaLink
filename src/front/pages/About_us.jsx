import React from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const team = [
    {
        name: "Francisco García",
        role: "Full Stack Developer",
        description:
            "Apasionado por la creación de productos digitales funcionales, bien pensados y con impacto real. Me gusta trabajar en equipo, cuidar los detalles y aportar soluciones que combinan creatividad y lógica.",
        image: "/fran.png",
        linkedin: "https://www.linkedin.com/in/franciscogarcia-dev/",
        github: "https://github.com/FranGG01",
    },
    {
        name: "Juan Camilo",
        role: "Full Stack Developer",
        description:
            "Disfruto convertir ideas en productos funcionales y bien ejecutados. Me centro en la calidad, los detalles y en que cada proyecto tenga un propósito claro y útil.",
        image: "../public/juanca.png",
        linkedin: "https://www.linkedin.com",
        github: "https://github.com/00hank00",
    },
    {
        name: "Enrique Spencer",
        role: "Full Stack Developer",
        description:
            "Puedo con el front y el back… hasta que aparece un bug.",
        image: "/Enrique.png",
        linkedin: "https://www.linkedin.com",
        github: "https://github.com/VykeAS",
    },
];

export default function AboutUs() {
    const navigate = useNavigate();
    return (
        <section className="min-h-screen bg-gray-900 text-white py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto text-center">
                <button
                    onClick={() => navigate("/feed")}
                    className="self-start mb-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                >
                    ← Volver
                </button>
                <motion.h2
                    className="text-4xl font-bold mb-6"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    ¿Quiénes somos?
                </motion.h2>

                <motion.p
                    className="text-lg text-gray-300 max-w-3xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.0, duration: 0.8 }}
                >
                    Somos un equipo que une talento e innovación para construir experiencias digitales que dejan huella. Desarrollamos aplicaciones web potentes, creativas y con propósito.
                </motion.p>
            </div>

            <div className="mt-20 grid gap-10 sm:grid-cols-3 justify-items-center max-w-6xl mx-auto">
                {team.map((member, index) => (
                    <motion.div
                        key={index}
                        className="bg-gray-800 p-8 rounded-2xl shadow-xl hover:scale-[1.03] transition-transform duration-300 w-full max-w-md border border-gray-700 hover:border-indigo-500"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.5 + index * 0.3 }}
                        viewport={{ once: true }}
                    >
                        <img
                            src={member.image}
                            alt={member.name}
                            className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-white shadow-md object-top" />
                        <h3 className="text-xl font-semibold text-center">{member.name}</h3>
                        <p className="text-indigo-400 mb-2 text-center">{member.role}</p>
                        <p className="text-gray-300 text-sm text-center">{member.description}</p>

                        <div className="flex justify-center gap-6 mt-5">
                            <motion.a
                                href={member.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:text-blue-400 text-2xl transition-all"
                                whileHover={{ scale: 1.2, rotate: -5 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <FaLinkedin />
                            </motion.a>
                            <motion.a
                                href={member.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:text-gray-300 text-2xl transition-all"
                                whileHover={{ scale: 1.2, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <FaGithub />
                            </motion.a>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
