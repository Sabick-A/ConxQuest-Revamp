import React from "react";
import "./Loader.css";
import { motion } from "framer-motion";

function Loader({ fadeOut }) {
    return (
        <div className={`loading-container z-20 ${fadeOut ? 'fade-out' : ''}`}>
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-full h-full border-2 border-green-400/10 rounded-full"
                        style={{
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                            opacity: 0
                        }}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{
                            scale: [0.5, 1.5, 0.5],
                            opacity: [0, 0.15, 0],
                            rotate: [0, 180, 360]
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            delay: i * 1.2,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-green-400/30 rounded-full"
                        initial={{ 
                            x: Math.random() * window.innerWidth, 
                            y: Math.random() * window.innerHeight 
                        }}
                        animate={{ 
                            y: [null, -40, 40],
                            x: [null, -40, 40],
                            scale: [1, 1.5, 1],
                            opacity: [0.3, 0.7, 0.3]
                        }}
                        transition={{ 
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut",
                            delay: Math.random() * 2
                        }}
                    />
                ))}
            </div>

            {/* Hexagon Grid Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                {[...Array(8)].map((_, row) => (
                    <div key={row} className="flex justify-center">
                        {[...Array(8)].map((_, col) => (
                            <motion.div
                                key={`${row}-${col}`}
                                className="w-24 h-24 m-2 clip-hexagon border border-green-400/20"
                                initial={{ opacity: 0.1 }}
                                animate={{ 
                                    opacity: [0.1, 0.3, 0.1],
                                    scale: [1, 1.1, 1]
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    delay: (row + col) * 0.2,
                                    ease: "easeInOut"
                                }}
                            />
                        ))}
                    </div>
                ))}
            </div>

            {/* Corner Decorations */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div 
                    className="absolute top-10 left-10 w-20 h-20 border-l-2 border-t-2 border-green-400/30"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div 
                    className="absolute top-10 right-10 w-20 h-20 border-r-2 border-t-2 border-green-400/30"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
                <motion.div 
                    className="absolute bottom-10 left-10 w-20 h-20 border-l-2 border-b-2 border-green-400/30"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />
                <motion.div 
                    className="absolute bottom-10 right-10 w-20 h-20 border-r-2 border-b-2 border-green-400/30"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                />
            </div>

            {/* Main Content */}
            <motion.h1 
                className="text-4xl md:text-5xl font-main text-green-400 text-center px-4 relative"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <motion.span
                    className="absolute -left-8 top-1/2 -translate-y-1/2 text-2xl"
                    animate={{ x: [-5, 5, -5], rotate: [-10, 10, -10] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    🌿
                </motion.span>
                Building The World
                <motion.span 
                    className="inline-block ml-2"
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, 0]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    🌳
                </motion.span>
                <motion.span
                    className="absolute -right-8 top-1/2 -translate-y-1/2 text-2xl"
                    animate={{ x: [5, -5, 5], rotate: [10, -10, 10] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    🌿
                </motion.span>
            </motion.h1>
            
            <div className="relative">
                <div className="tree mt-10">
                    {/* Existing tree structure */}
                    <div className="branch" style={{ "--x": "0" }}>
                        <span style={{ "--i": "0" }}></span>
                        <span style={{ "--i": "1" }}></span>
                        <span style={{ "--i": "2" }}></span>
                        <span style={{ "--i": "3" }}></span>
                    </div>
                    <div className="branch" style={{ "--x": "1" }}>
                        <span style={{ "--i": "0" }}></span>
                        <span style={{ "--i": "1" }}></span>
                        <span style={{ "--i": "2" }}></span>
                        <span style={{ "--i": "3" }}></span>
                    </div>
                    <div className="branch" style={{ "--x": "2" }}>
                        <span style={{ "--i": "0" }}></span>
                        <span style={{ "--i": "1" }}></span>
                        <span style={{ "--i": "2" }}></span>
                        <span style={{ "--i": "3" }}></span>
                    </div>
                    <div className="branch" style={{ "--x": "3" }}>
                        <span style={{ "--i": "0" }}></span>
                        <span style={{ "--i": "1" }}></span>
                        <span style={{ "--i": "2" }}></span>
                        <span style={{ "--i": "3" }}></span>
                    </div>
                    <div className="stem">
                        <span style={{ "--i": "0" }}></span>
                        <span style={{ "--i": "1" }}></span>
                        <span style={{ "--i": "2" }}></span>
                        <span style={{ "--i": "3" }}></span>
                    </div>
                    <span className="shadow"></span>
                </div>
            </div>

            {/* Loading Text with Enhanced Effects */}
            <div className="relative flex flex-col items-center">
                <div className="relative">
                    <motion.h1 
                        className="font-game text-base text-green-400/80"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        Loading...
                    </motion.h1>
                    <motion.div 
                        className="absolute -bottom-2 w-[120%] h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent left-1/2 -translate-x-1/2"
                        animate={{
                            scaleX: [1, 1.5, 1],
                            opacity: [0.3, 0.7, 0.3]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </div>
                
                {/* Progress Dots */}
                <div className="flex gap-2 mt-4">
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-green-400/50"
                            animate={{ 
                                scale: [1, 1.5, 1],
                                opacity: [0.3, 1, 0.3]
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: i * 0.2
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Loader;
