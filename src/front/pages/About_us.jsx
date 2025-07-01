import React from "react";
import { motion } from "framer-motion";

const team = [
    {
        name: "Francisco García",
        role: "Full Stack Developer",
        description:
            "Apasionado por la creación de productos digitales funcionales, bien pensados y con impacto real. Me gusta trabajar en equipo, cuidar los detalles y aportar soluciones que combinan creatividad y lógica.",
        image: "https://ui-avatars.com/api/?name=Francisco+García&background=0D8ABC&color=fff&size=128&bold=true",
    },
    {
        name: "Juan Camilo",
        role: "Full Stack Developer",
        description:
            "Disfruto convertir ideas en productos funcionales y bien ejecutados. Me centro en la calidad, los detalles y en que cada proyecto tenga un propósito claro y útil.",
        image: "https://ui-avatars.com/api/?name=Juan+Camilo&background=8B5CF6&color=fff",
    },
];

export default function AboutUs() {
    return (
        <section className="min-h-screen bg-gray-900 text-white py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto text-center">
                <motion.h2
                    className="text-4xl font-bold mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    ¿Quiénes somos?
                </motion.h2>

                <motion.p
                    className="text-lg text-gray-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                >
                    Somos un equipo que unimos talento e innovación para construir experiencias digitales que dejan huella. Somos desarrolladores con visión de futuro, creando aplicaciones web poderosas y orientadas al cambio.
                </motion.p>
            </div>

            <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-2 max-w-6xl mx-auto">
                {team.map((member, index) => (
                    <motion.div
                        key={index}
                        className="bg-gray-800 p-8 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 2.5 }}
                        viewport={{ once: true }}
                    >
                        <img
                            src={member.image}
                            alt={member.name}
                            className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-md"
                        />
                        <h3 className="text-xl font-semibold">{member.name}</h3>
                        <p className="text-indigo-400 mb-2">{member.role}</p>
                        <p className="text-gray-300 text-sm">{member.description}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
