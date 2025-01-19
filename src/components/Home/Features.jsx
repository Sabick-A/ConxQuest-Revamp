import React, { useState, useEffect } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import gamifiedLearning from '../../assets/images/Home/gamifiedLearning.webp';
import MapImage from '../../assets/images/Home/MapImage.webp';
import chatbot from '../../assets/images/Home/chatbot.webp';
import resource from '../../assets/images/Home/resource.webp';
import npc from '../../assets/images/Home/npc.webp';

const FeaturesSection = styled.div`
    min-height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: rgb(5, 46, 22);
    position: relative;
    overflow: hidden;
    padding-top: 20px;

    @media (max-width: 768px) {
        padding-top: 100px;
    }

`;

const Background = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    z-index: 1;
    background: linear-gradient(120deg, rgba(5, 46, 22, 0.95) 0%, rgba(5, 46, 22, 0.98) 100%);
`;

const HexGrid = styled(motion.div)`
    position: absolute;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 2rem;
    transform: rotate(-15deg) scale(1.5);
    opacity: 0.1;
`;

const Hexagon = styled(motion.div)`
    width: 100%;
    padding-top: 115%;
    position: relative;
    clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
    background: linear-gradient(135deg, rgba(74, 222, 128, 0.3) 0%, rgba(74, 222, 128, 0.1) 100%);
`;

const ContentWrapper = styled(motion.div)`
    position: relative;
    z-index: 20;
    width: 100%;
    height: 100%;
`;

const Title = styled(motion.h1)`
    opacity: 0;
    padding-top: 6rem;
    transform: translateY(20px);
    animation: titleAppear 0.8s ease-out forwards;
    margin-bottom: 4rem;
    position: relative;
    z-index: 20;
    font-size: 3rem;
    text-align: center;
    
    @media (max-width: 1024px) {
        font-size: 3rem;
        padding-top: 4rem;
        margin-bottom: 3rem;
    }

    @media (max-width: 768px) {
        font-size: 2.2rem;
        padding-top: 1.5rem;
        margin-bottom: 1.5rem;
    }

    @media (max-width: 480px) {
        font-size: 1.8rem;
        padding-top: 0.5rem;
        margin-bottom: 1rem;
    }
    
    @keyframes titleAppear {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    &::after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
        width: 100px;
        height: 4px;
        background: linear-gradient(90deg, transparent, #4ade80, transparent);
        border-radius: 2px;

        @media (max-width: 768px) {
            width: 60px;
            height: 3px;
            bottom: -5px;
        }
    }
`;

const CarouselContainer = styled(motion.div)`
    width: 90%;
    max-width: 1400px;
    height: 70vh;
    margin: 0 auto 2rem auto;
    display: flex;
    align-items: center;
    gap: 4rem;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(10px);
    border-radius: 30px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);

    @media (max-width: 1024px) {
        flex-direction: column;
        gap: 2rem;
        padding: 1.5rem;
        width: 92%;
        height: auto;
        min-height: 60vh;
    }

    @media (max-width: 768px) {
        padding: 1rem;
        gap: 1rem;
        width: 90%;
        min-height: 50vh;
    }

    @media (max-width: 480px) {
        width: 90%;
        padding: 0.75rem;
        gap: 0.75rem;
        margin: 0 auto 1rem auto;
        border-radius: 20px;
        min-height: auto;
    }
`;

const ImageContainer = styled(motion.div)`
    flex: 0.5;
    aspect-ratio: 1;
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    background-color: ${props => props.$bgColor || 'rgba(20, 83, 45, 0.6)'};
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    @media (max-width: 1024px) {
        width: 100%;
        max-width: 400px;
        margin: 0 auto;
    }

    @media (max-width: 768px) {
        max-width: 300px;
    }

    @media (max-width: 480px) {
        max-width: 250px;
        border-radius: 15px;
    }

    &::before {
        content: '';
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.3));
        z-index: 1;
    }
`;

const ImagePreloader = styled.div`
    display: none;
    visibility: hidden;
    height: 0;
    width: 0;
`;

const StyledImage = styled(motion.img)`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
    transition: opacity 0.3s ease-in-out;
    opacity: ${props => props.$isLoaded ? 1 : 0};
`;

const ImageSkeleton = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
        90deg,
        rgba(74, 222, 128, 0.1) 25%,
        rgba(74, 222, 128, 0.15) 37%,
        rgba(74, 222, 128, 0.1) 63%
    );
    background-size: 400% 100%;
    animation: shimmerAnimation 1.4s ease infinite;
    border-radius: inherit;

    @keyframes shimmerAnimation {
        0% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0 50%;
        }
    }
`;

const ContentContainer = styled(motion.div)`
    flex: 0.8;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: white;
    padding: 2rem;
`;

const FeatureName = styled(motion.h2)`
    font-size: 3.5rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
    font-family: 'Main';
    background: linear-gradient(90deg, #ffffff, #4ade80);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 0 20px rgba(74, 222, 128, 0.3);

    @media (max-width: 1024px) {
        font-size: 2.8rem;
        margin-bottom: 1rem;
        text-align: center;
    }

    @media (max-width: 768px) {
        font-size: 2.2rem;
        margin-bottom: 0.75rem;
    }

    @media (max-width: 480px) {
        font-size: 1.8rem;
        margin-bottom: 0.5rem;
    }
`;

const FeatureDescription = styled(motion.p)`
    font-size: 1.2rem;
    line-height: 1.8;
    margin-bottom: 3rem;
    opacity: 0.9;
    font-family: 'Rubik Bubbles', 'Main';
    position: relative;
    padding-left: 1rem;
    border-left: 3px solid #4ade80;

    @media (max-width: 1024px) {
        font-size: 1.1rem;
        margin-bottom: 2rem;
        text-align: center;
        padding-left: 0;
        border-left: none;
        border-bottom: 2px solid #4ade80;
        padding-bottom: 1rem;
    }

    @media (max-width: 768px) {
        font-size: 1rem;
        margin-bottom: 1.5rem;
    }

    @media (max-width: 480px) {
        font-size: 0.9rem;
        margin-bottom: 1rem;
        line-height: 1.6;
    }
`;

const NavigationButtons = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
`;

const NavButton = styled(motion.button)`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: rgba(74, 222, 128, 0.1);
    border: 2px solid rgba(74, 222, 128, 0.3);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at center, #4ade80 0%, transparent 100%);
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    &:hover {
        transform: scale(1.1);
        border-color: #4ade80;
        
        &::before {
            opacity: 0.2;
        }
    }

    svg {
        width: 24px;
        height: 24px;
        position: relative;
        z-index: 1;
    }
`;

const ProgressBar = styled.div`
    position: absolute;
    bottom: 3rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 0.5rem;
    z-index: 20;
`;

const ProgressDot = styled.div`
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${props => props.$active ? '#4ade80' : 'rgba(74, 222, 128, 0.3)'};
    margin: 0 6px;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
        transform: scale(1.2);
        background-color: ${props => props.$active ? '#4ade80' : 'rgba(74, 222, 128, 0.5)'};
    }
`;

const features = [
    {
        name: "Gamified Learning",
        icon: gamifiedLearning,
        bgColor: "#2A1810",
        description: "Interactive games designed to teach children about the Constitution."
    },
    {
        name: "2D Navigable Map",
        icon: MapImage,
        bgColor: "#2A2810",
        description: "A visually engaging map where players can navigate their character to explore various levels."
    },
    {
        name: "Fine-Tuned Chatbot",
        icon: chatbot,
        bgColor: "#2A1810",
        description: "A chatbot integrated into the game to answer queries about the Constitution, offering contextually accurate and educational responses."
    },
    {
        name: "Educational Resources",
        icon: resource,
        bgColor: "#2A1810",
        description: "Each level provides resources to enhance learning and understanding of constitutional topics."
    },
    {
        name: "Interactable NPCs",
        icon: npc,
        bgColor: "#2A1810",
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
        <FeaturesSection id='features'>
            <Background
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <HexGrid>
                    {[...Array(32)].map((_, index) => (
                        <Hexagon
                            key={index}
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
                </HexGrid>
            </Background>
            <ImagePreloader>
                {features.map((feature, index) => (
                    <link key={index} rel="preload" as="image" href={feature.icon} />
                ))}
            </ImagePreloader>
            <ContentWrapper
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                variants={containerVariants}
            >
                <div className='w-full z-20'>
                    <Title
                        initial={{ opacity: 0, y: 20 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className='text-white text-center w-full font-bold font-main'
                    >
                        Features We Offer
                    </Title>
                    <AnimatePresence mode='wait' custom={direction}>
                        <CarouselContainer
                            key={currentIndex}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 500, damping: 25, mass: 0.5 },
                                opacity: { duration: 0.15 },
                                scale: { duration: 0.15 }
                            }}
                        >
                            <ImageContainer
                                initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
                                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                                $bgColor={features[currentIndex].bgColor}
                                whileHover={{ scale: 1.05, rotate: 5 }}
                            >
                                {!imageLoaded[currentIndex] && <ImageSkeleton />}
                                <StyledImage
                                    src={features[currentIndex].icon}
                                    alt={features[currentIndex].name}
                                    $isLoaded={imageLoaded[currentIndex]}
                                    onLoad={() => {
                                        setImageLoaded(prev => ({
                                            ...prev,
                                            [currentIndex]: true
                                        }));
                                    }}
                                    loading="eager"
                                    decoding="async"
                                />
                            </ImageContainer>
                            <ContentContainer>
                                <FeatureName
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.2, delay: 0.07 }}
                                >
                                    {features[currentIndex].name}
                                </FeatureName>
                                <FeatureDescription
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.2, delay: 0.13 }}
                                    className="font-game"
                                >
                                    {features[currentIndex].description}
                                </FeatureDescription>
                                <NavigationButtons>
                                    <NavButton
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                        onClick={prevSlide}
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </NavButton>
                                    <NavButton
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                        onClick={nextSlide}
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </NavButton>
                                </NavigationButtons>
                            </ContentContainer>
                        </CarouselContainer>
                    </AnimatePresence>
                    <ProgressBar>
                        {features.map((_, index) => (
                            <ProgressDot 
                                key={index}
                                $active={index === currentIndex}
                                onClick={() => goToSlide(index)}
                            />
                        ))}
                    </ProgressBar>
                </div>
            </ContentWrapper>
        </FeaturesSection>
    );
}

export default Features;