import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useSound from "use-sound";
import Bombilla from "../assets/img/Logo_dark.png";
import explosionSound from "../assets/img/sounds/explosion.mp3";

const particles = Array.from({ length: 70 });

export default function LogoBombilla() {
    const [hoverCount, setHoverCount] = useState(0);
    const [exploded, setExploded] = useState(false);
    const [playExplosion] = useSound(explosionSound);

    const handleHover = () => {
        if (exploded) return;

        const newCount = hoverCount + 1;
        setHoverCount(newCount);

        if (newCount >= 3) {
            playExplosion();
            setExploded(true);
            setTimeout(() => {
                setExploded(false);
                setHoverCount(0);
            }, 3000);
        }
    };

    return (
        <>
            <div
                className="relative h-[140px] w-[220px] cursor-pointer"
                onMouseEnter={handleHover}
            >
                {!exploded && (
                    <motion.img
                        key="bombilla"
                        src={Bombilla}
                        alt="Logo"
                        className="w-[200px] h-[150px] object-cover"
                        initial={{ scale: 1 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0, opacity: 0, rotate: 90 }}
                        transition={{ duration: 0.5 }}
                    />
                )}
            </div>

            {/* EXPLOSIÓN A PANTALLA COMPLETA */}
            <AnimatePresence>
                {exploded && (
                    <motion.div
                        className="fixed inset-0 z-50 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Fondo negro semitransparente */}
                        <div className="absolute inset-0 bg-black bg-opacity-80"></div>

                        {/* Partículas */}
                        {particles.map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-3 h-3 bg-yellow-300 rounded-full"
                                style={{ top: "50%", left: "50%" }}
                                animate={{
                                    top: `${Math.random() * 100}vh`,
                                    left: `${Math.random() * 100}vw`,
                                    opacity: 0,
                                    scale: 2,
                                }}
                                transition={{
                                    duration: 1.5,
                                    ease: "easeOut",
                                }}
                            />
                        ))}

                        {/* Texto explosión */}
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center text-yellow-300 font-extrabold text-4xl"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1.2 }}
                            exit={{ scale: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            💥 ¡IDEA EXPLOTADA!
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
