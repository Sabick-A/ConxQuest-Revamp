import React, { useState, useEffect } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { motion, AnimatePresence } from 'framer-motion';
import gamifiedLearning from '../../assets/images/Home/gamifiedLearning.webp';
import MapImage from '../../assets/images/Home/MapImage.webp';
import chatbot from '../../assets/images/Home/chatbot.webp';
import resource from '../../assets/images/Home/resource.webp';
import npc from '../../assets/images/Home/npc.webp';

const features = [
    {
        name: "Gamified Learning",
        icon: gamifiedLearning,
        bgColor: "bg-[#2A1810]",
        description: "Interactive games designed to teach children about the Constitution."
    },
    {
        name: "2D Navigable Map",
        icon: MapImage,
        bgColor: "bg-[#2A2810]",
        description: "A visually engaging map where players can navigate their character to explore various levels."
    },
    {
        name: "Fine-Tuned Chatbot",
        icon: chatbot,
        bgColor: "bg-[#2A1810]",
        description: "A chatbot integrated into the game to answer queries about the Constitution, offering  accurate and educational responses."
    },
    {
        name: "Educational Resources",
        icon: resource,
        bgColor: "bg-[#2A1810]",
        description: "Each level provides resources to enhance learning and understanding of constitutional topics."
    },
    {
        name: "Interactable NPCs",
        icon: npc,
        bgColor: "bg-[#2A1810]",
        description: "NPCs are present throughout the game for interactions, guidance, and additional challenges."
    },
];

const slideVariants = {
    enter: (direction) => ({
        x: direction > 0 ? 200 : -200,
        opacity: 0,
        scale: 0.9
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
        scale: 1
    },
    exit: (direction) => ({
        zIndex: 0,
        x: direction < 0 ? 200 : -200,
        opacity: 0,
        scale: 0.9
    })
};

const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            staggerChildren: 0.2
        }
    }
};

function Features() {
    useScrollAnimation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [imageLoaded, setImageLoaded] = useState({});

    useEffect(() => {
        const preloadImages = () => {
            features.forEach((feature, index) => {
                const img = new Image();
                img.src = feature.icon;
                img.onload = () => {
                    setImageLoaded(prev => ({
                        ...prev,
                        [index]: true
                    }));
                };
            });
        };

        preloadImages();
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.2 }
        );

        const section = document.getElementById('features');
        if (section) observer.observe(section);

        return () => {
            if (section) observer.unobserve(section);
        };
    }, []);

    const nextSlide = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % features.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + features.length) % features.length);
    };

    const goToSlide = (index) => {
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
    };

    return (
        <div id="features" className="min-h-screen w-full flex flex-col bg-[rgb(5,46,22)] relative overflow-hidden pt-5 md:pt-24">
            {/* Background with hexagons */}
            <motion.div 
                className="absolute inset-0 overflow-hidden z-[1] bg-gradient-to-br from-[rgba(5,46,22,0.95)] to-[rgba(5,46,22,0.98)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className="absolute w-full h-full grid grid-cols-8 gap-8 -rotate-15 scale-150 opacity-10">
                    {[...Array(32)].map((_, index) => (
                        <motion.div
                            key={index}
                            className="w-full pt-[115%] relative clip-hexagon bg-gradient-to-br from-[rgba(74,222,128,0.3)] to-[rgba(74,222,128,0.1)]"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ 
                                opacity: [0.4, 0.8, 0.4],
                                scale: [0.8, 1, 0.8],
                            }}
                            transition={{
                                duration: 4 + (index % 4) * 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: index * 0.1
                            }}
                        />
                    ))}
                </div>
            </motion.div>

            {/* Content */}
            <motion.div
                className="relative z-20 w-9/12 mx-auto"
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                variants={containerVariants}
            >
                {/* Title */}
                <motion.h1
                    className="text-white text-center font-bold font-main text-2xl pt-20 mb-6 relative opacity-0 translate-y-5 
                             lg:text-5xl lg:pt-6 lg:mb-12
                             md:text-3xl md:pt-6 md:mb-6
                             sm:text-2xl  sm:mb-6
                             after:content-[''] after:absolute after:bottom-[-10px] after:left-1/2 after:transform after:-translate-x-1/2 
                             after:w-24 after:h-1 after:bg-gradient-to-r after:from-transparent after:via-green-400 after:to-transparent 
                             after:rounded-full md:after:w-16 md:after:h-[3px] md:after:bottom-[-5px]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    Features We Offer
                </motion.h1>

                {/* Carousel */}
                <AnimatePresence mode='wait' custom={direction}>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="w-[90%] max-w-[1400px] min-h-[70vh] mx-auto mb-8 flex flex-col md:flex-row items-center gap-8 p-4 
                                 bg-[rgba(255,255,255,0.03)] backdrop-blur-lg rounded-xl md:rounded-3xl border border-[rgba(255,255,255,0.1)]
                                 shadow-2xl"
                        transition={{
                            x: { type: "spring", stiffness: 500, damping: 25, mass: 0.5 },
                            opacity: { duration: 0.15 },
                            scale: { duration: 0.15 }
                        }}
                    >
                        {/* Image Container */}
                        <motion.div
                            className={`w-full max-w-[250px] md:max-w-none md:w-[45%] aspect-square relative rounded-lg overflow-hidden ${features[currentIndex].bgColor} shadow-md
                                      before:content-[''] before:absolute before:inset-0 before:bg-radial-gradient before:z-[1]`}
                            initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            whileHover={{ scale: 1.05, rotate: 5 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                        >
                            {!imageLoaded[currentIndex] && (
                                <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-[rgba(74,222,128,0.1)] via-[rgba(74,222,128,0.15)] to-[rgba(74,222,128,0.1)] bg-[length:400%_100%]" />
                            )}
                            <img
                                src={features[currentIndex].icon}
                                alt={features[currentIndex].name}
                                className={`w-full h-full object-cover rounded-lg transition-opacity duration-300 ${imageLoaded[currentIndex] ? 'opacity-100' : 'opacity-0'}`}
                                onLoad={() => {
                                    setImageLoaded(prev => ({
                                        ...prev,
                                        [currentIndex]: true
                                    }));
                                }}
                                loading="eager"
                                decoding="async"
                            />
                        </motion.div>

                        {/* Content Container */}
                        <div className="w-full md:w-[55%] flex flex-col justify-center items-center text-white p-4">
                            <motion.h2
                                className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl 
                                         font-bold mb-3 md:mb-4 lg:mb-6 
                                         font-serif bg-gradient-to-r from-white to-green-400 
                                         bg-clip-text text-transparent text-center
                                         drop-shadow-[0_0_20px_rgba(74,222,128,0.3)]"
                            >
                                {features[currentIndex].name}
                            </motion.h2>
                            <motion.p
                                className="text-sm md:text-base lg:text-lg 
                                         leading-6 md:leading-7 lg:leading-8 
                                         mb-6 md:mb-8 lg:mb-12 
                                         opacity-90 font-main text-center
                                         w-full max-w-[90%] mx-auto
                                         border-b-2 border-green-400 pb-4"
                            >
                                {features[currentIndex].description}
                            </motion.p>

                            {/* Navigation Buttons */}
                            <div className="flex gap-4 items-center justify-center mt-2 md:mt-0">
                                <motion.button
                                    className="w-10 h-10 md:w-[50px] md:h-[50px] rounded-full bg-[rgba(74,222,128,0.1)] border-2 border-[rgba(74,222,128,0.3)] 
                                             text-white flex items-center justify-center cursor-pointer transition-all duration-300 relative overflow-hidden
                                             hover:border-green-400 hover:scale-110 hover:before:opacity-20
                                             before:content-[''] before:absolute before:inset-0 before:bg-radial-gradient-center before:opacity-0 
                                             before:transition-opacity before:duration-300"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                    onClick={prevSlide}
                                >
                                    <svg className="w-6 h-6 relative z-[1]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </motion.button>
                                <motion.button
                                    className="w-10 h-10 md:w-[50px] md:h-[50px] rounded-full bg-[rgba(74,222,128,0.1)] border-2 border-[rgba(74,222,128,0.3)] 
                                             text-white flex items-center justify-center cursor-pointer transition-all duration-300 relative overflow-hidden
                                             hover:border-green-400 hover:scale-110 hover:before:opacity-20
                                             before:content-[''] before:absolute before:inset-0 before:bg-radial-gradient-center before:opacity-0 
                                             before:transition-opacity before:duration-300"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                    onClick={nextSlide}
                                >
                                    <svg className="w-6 h-6 relative z-[1]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Progress Dots */}
                <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                    {features.map((_, index) => (
                        <button
                            key={index}
                            className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer
                                     hover:transform hover:scale-120 
                                     ${index === currentIndex ? 'bg-green-400' : 'bg-[rgba(74,222,128,0.3)]'}
                                     hover:${index === currentIndex ? 'bg-green-400' : 'bg-[rgba(74,222,128,0.5)]'}`}
                            onClick={() => goToSlide(index)}
                        />
                    ))}
                </div>
            </motion.div>
        </div>
    );
}

export default Features;