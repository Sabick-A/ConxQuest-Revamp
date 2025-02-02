import React from "react";
import "./Loader.css";
import { motion } from "framer-motion";

function Loader({ fadeOut }) {
    return (
        <div className={`loading-container ${fadeOut ? 'fade-out' : ''}`}>
            {/* Optimized Background Pattern - reduced count and simplified animation */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-full h-full border-2 border-green-400/10 rounded-full"
                        style={{
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                        }}
                        initial={{ scale: 0.5 }}
                        animate={{
                            scale: [0.5, 1.5, 0.5],
                            opacity: [0.1, 0.2, 0.1],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            delay: i * 1.3,
                            ease: "linear"
                        }}
                    />
                ))}
            </div>

            {/* Optimized particles - reduced count */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-green-400/30 rounded-full"
                        initial={{ 
                            x: Math.random() * window.innerWidth, 
                            y: Math.random() * window.innerHeight,
                            opacity: 0.3
                        }}
                        animate={{ 
                            y: [null, -20, 20],
                            x: [null, -20, 20],
                            opacity: [0.3, 0.5, 0.3]
                        }}
                        transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "linear",
                            delay: Math.random()
                        }}
                    />
                ))}
            </div>

            {/* Simplified Hexagon Grid - reduced size and count */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                {[...Array(4)].map((_, row) => (
                    <div key={row} className="flex justify-center">
                        {[...Array(4)].map((_, col) => (
                            <motion.div
                                key={`${row}-${col}`}
                                className="w-16 h-16 m-2 clip-hexagon border border-green-400/20"
                                animate={{ 
                                    opacity: [0.1, 0.2, 0.1]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: (row + col) * 0.2,
                                    ease: "linear"
                                }}
                            />
                        ))}
                    </div>
                ))}
            </div>

            {/* Simplified Corner Decorations */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div 
                    className="absolute top-10 left-10 w-20 h-20 border-l-2 border-t-2 border-green-400/30"
                    animate={{ opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <motion.div 
                    className="absolute top-10 right-10 w-20 h-20 border-r-2 border-t-2 border-green-400/30"
                    animate={{ opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5, ease: "linear" }}
                />
                <motion.div 
                    className="absolute bottom-10 left-10 w-20 h-20 border-l-2 border-b-2 border-green-400/30"
                    animate={{ opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1, ease: "linear" }}
                />
                <motion.div 
                    className="absolute bottom-10 right-10 w-20 h-20 border-r-2 border-b-2 border-green-400/30"
                    animate={{ opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1.5, ease: "linear" }}
                />
            </div>

            {/* Main Content */}
            <motion.h1 
                className="text-4xl md:text-5xl font-main text-green-400 text-center px-4 relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                Building The World
            </motion.h1>
            
            <div className="relative mt-10">
                <div className="tree">
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
                    <div className="stem">
                        <span style={{ "--i": "0" }}></span>
                        <span style={{ "--i": "1" }}></span>
                        <span style={{ "--i": "2" }}></span>
                        <span style={{ "--i": "3" }}></span>
                    </div>
                    <span className="shadow"></span>
                </div>
            </div>

            {/* Loading Text with Progress Dots */}
            <div className="relative flex flex-col items-center mt-4">
                <motion.div 
                    className="font-game text-base text-green-400/80"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                >
                    Loading
                    <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    >...</motion.span>
                </motion.div>
            </div>
        </div>
    );
}

export default Loader;
