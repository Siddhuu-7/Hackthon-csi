import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const Preloader = ({ onComplete }) => {
    const text = "UDHBAV";

    useEffect(() => {
        // Timer to trigger completion after animation
        // Extended to allow for the new effects
        const timer = setTimeout(() => {
            onComplete();
        }, 2500);

        return () => clearTimeout(timer);
    }, [onComplete]);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            }
        },
        exit: {
            opacity: 0,
            scale: 1.2,
            filter: "blur(10px)",
            transition: { duration: 0.6, ease: "easeInOut" }
        }
    };

    const letterAnim = {
        hidden: {
            opacity: 0,
            y: 100,
            rotateX: -90,
            filter: "blur(10px)"
        },
        show: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            filter: "blur(0px)",
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100
            }
        }
    };

    // Pulsing glow animation for the letters
    const glowPulse = {
        animate: {
            textShadow: [
                "0 0 20px rgba(20, 184, 166, 0.5), 0 0 40px rgba(20, 184, 166, 0.3)",
                "0 0 40px rgba(20, 184, 166, 0.8), 0 0 80px rgba(20, 184, 166, 0.5), 0 0 120px rgba(20, 184, 166, 0.3)",
                "0 0 20px rgba(20, 184, 166, 0.5), 0 0 40px rgba(20, 184, 166, 0.3)"
            ],
            transition: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.2
            }
        }
    };

    // Expanding ring animation
    const ringVariants = {
        initial: { scale: 0.8, opacity: 0 },
        animate: {
            scale: [0.8, 2.5],
            opacity: [0.6, 0],
            transition: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut",
                delay: 1.2
            }
        }
    };

    // Tagline animation
    const taglineVariants = {
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                delay: 1.4,
                ease: "easeOut"
            }
        }
    };

    // Particles floating up
    const particles = Array.from({ length: 20 });

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#080b14] overflow-hidden"
            initial="hidden"
            animate="show"
            exit="exit"
            variants={container}
        >
            {/* Background ambient glow */}
            <motion.div
                className="absolute inset-0 bg-gradient-radial from-teal-500/10 via-transparent to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 1.5, duration: 0.5 }}
            />

            {/* Expanding rings behind the text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {[0, 0.3, 0.6].map((delay, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-64 h-64 md:w-96 md:h-96 rounded-full border-2 border-teal-400/40"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{
                            scale: [0.8, 0.8, 3],
                            opacity: [0, 0.5, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeOut",
                            delay: 1.5 + delay,
                            times: [0, 0.01, 1]
                        }}
                    />
                ))}
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {particles.map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 md:w-2 md:h-2 bg-teal-400 rounded-full"
                        initial={{
                            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                            y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 20,
                            opacity: 0
                        }}
                        animate={{
                            y: -20,
                            opacity: [0, 0.8, 0],
                            transition: {
                                duration: 2 + Math.random() * 2,
                                repeat: Infinity,
                                delay: 1.2 + Math.random() * 1.5,
                                ease: "easeOut"
                            }
                        }}
                        style={{
                            boxShadow: "0 0 6px rgba(20, 184, 166, 0.8)"
                        }}
                    />
                ))}
            </div>

            {/* Main text */}
            <div className="relative z-10 flex perspective-1000">
                {text.split("").map((char, index) => (
                    <motion.span
                        key={index}
                        variants={letterAnim}
                        animate={glowPulse.animate}
                        className="font-display text-6xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-teal-400 mx-1 md:mx-4"
                        style={{
                            textShadow: "0 0 20px rgba(20, 184, 166, 0.5), 0 0 40px rgba(20, 184, 166, 0.3)",
                            display: "inline-block",
                            transformStyle: "preserve-3d"
                        }}
                    >
                        {char}
                    </motion.span>
                ))}
            </div>

            {/* Tagline that fades in */}
            <motion.p
                className="mt-6 md:mt-8 text-sm md:text-lg text-teal-400/80 tracking-[0.3em] uppercase font-medium"
                variants={taglineVariants}
            >
                Innovate • Create • Inspire
            </motion.p>

            {/* Loading shimmer bar */}
            <motion.div
                className="absolute bottom-12 w-48 h-1 rounded-full overflow-hidden bg-white/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 1.4 } }}
            >
                <motion.div
                    className="h-full bg-gradient-to-r from-transparent via-teal-400 to-transparent"
                    animate={{
                        x: ["-100%", "200%"]
                    }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    style={{ width: "50%" }}
                />
            </motion.div>
        </motion.div>
    );
};

export default Preloader;
