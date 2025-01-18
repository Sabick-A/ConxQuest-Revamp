import React, { useEffect, useState } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { PlayCircle, Map, BookOpen, Trophy, Users, MessageSquareMore } from 'lucide-react';

const HowToPlaySection = styled.div`
    min-height: 100vh;
    width: 100%;
    display: grid;
    place-items: center;
    background-color: rgb(5, 46, 22);
    position: relative;
    overflow: hidden;
    padding: 60px 0;
    margin-top: -60px;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 150px;
        background: linear-gradient(to bottom, rgb(5, 46, 22) 0%, transparent 100%);
        z-index: 2;
    }

    @media (max-width: 768px) {
        padding: 40px 0;
        margin-top: -40px;

        &::before {
            height: 100px;
        }
    }
`;

const ContentContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2.5rem;
    z-index: 2;

    @media (max-width: 768px) {
        gap: 2rem;
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
    background: 
        linear-gradient(120deg, rgba(5, 46, 22, 0.97) 0%, rgba(5, 46, 22, 0.99) 100%),
        repeating-linear-gradient(
            45deg,
            rgba(74, 222, 128, 0.08) 0px,
            rgba(74, 222, 128, 0.08) 2px,
            transparent 2px,
            transparent 10px
        );

    &::before {
        content: '';
        position: absolute;
        width: 150%;
        height: 150%;
        top: -25%;
        left: -25%;
        background: 
            radial-gradient(
                ellipse at top left,
                rgba(74, 222, 128, 0.12) 0%,
                transparent 50%
            ),
            radial-gradient(
                ellipse at bottom right,
                rgba(74, 222, 128, 0.12) 0%,
                transparent 50%
            );
        animation: shimmer 10s ease-in-out infinite;
        filter: blur(8px);
    }

    &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: 
            linear-gradient(
                45deg,
                transparent 0%,
                rgba(74, 222, 128, 0.1) 25%,
                transparent 50%,
                rgba(74, 222, 128, 0.1) 75%,
                transparent 100%
            );
        animation: wave 8s linear infinite;
        filter: blur(3px);
    }

    @keyframes shimmer {
        0%, 100% {
            opacity: 0.5;
            transform: translate(-5%, -5%) scale(1);
        }
        25% {
            opacity: 0.7;
            transform: translate(5%, 5%) scale(1.02);
        }
        50% {
            opacity: 0.5;
            transform: translate(5%, -5%) scale(1);
        }
        75% {
            opacity: 0.7;
            transform: translate(-5%, 5%) scale(1.02);
        }
    }

    @keyframes wave {
        0% {
            background-position: 0% 0%;
        }
        100% {
            background-position: 200% 200%;
        }
    }

    @media (max-width: 768px) {
        &::before {
            width: 200%;
            height: 200%;
            top: -50%;
            left: -50%;
            background: 
                radial-gradient(
                    ellipse at top left,
                    rgba(74, 222, 128, 0.2) 0%,
                    transparent 60%
                ),
                radial-gradient(
                    ellipse at bottom right,
                    rgba(74, 222, 128, 0.2) 0%,
                    transparent 60%
                );
            animation-duration: 8s;
        }

        &::after {
            background: 
                linear-gradient(
                    45deg,
                    transparent 0%,
                    rgba(74, 222, 128, 0.15) 25%,
                    transparent 50%,
                    rgba(74, 222, 128, 0.15) 75%,
                    transparent 100%
                );
            background-size: 200% 200%;
            animation-duration: 6s;
        }
    }
`;

const Title = styled(motion.h1)`
    opacity: 0;
    padding-top: 2rem;
    transform: translateY(20px);
    animation: titleAppear 0.8s ease-out forwards;
    margin-bottom: 2rem;
    position: relative;
    z-index: 20;
    font-size: 3.5rem;
    text-align: center;
    text-shadow: 0 0 20px rgba(74, 222, 128, 0.3);
    letter-spacing: 2px;
    
    @media (max-width: 1024px) {
        font-size: 2.5rem;
        margin-bottom: 3rem;
    }

    @media (max-width: 768px) {
        font-size: 2rem;
        margin-bottom: 2rem;
    }

    &::after {
        content: '';
        position: absolute;
        bottom: -15px;
        left: 50%;
        transform: translateX(-50%);
        width: 150px;
        height: 4px;
        background: linear-gradient(90deg, transparent, #4ade80, transparent);
        border-radius: 2px;
        box-shadow: 0 0 20px rgba(74, 222, 128, 0.5);

        @media (max-width: 768px) {
            width: 100px;
            height: 3px;
            bottom: -10px;
        }
    }

    @keyframes titleAppear {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

const IconWrapper = styled.div`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: rgba(74, 222, 128, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    
    &::after {
        content: '';
        position: absolute;
        inset: -4px;
        border-radius: 50%;
        background: linear-gradient(45deg, transparent, rgba(74, 222, 128, 0.3), transparent);
        animation: rotate 3s linear infinite;
    }

    svg {
        width: 40px;
        height: 40px;
        color: #4ade80;
        filter: drop-shadow(0 0 7px rgba(74, 222, 128, 0.5));
    }

    @media (max-width: 768px) {
        width: 70px;
        height: 70px;

        svg {
            width: 35px;
            height: 35px;
        }
    }
`;

const Card = styled(motion.div)`
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(10px);
    border-radius: 18px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 2.5rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
    text-align: center;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    height: 100%;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(
            circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
            rgba(74, 222, 128, 0.1) 0%,
            transparent 50%
        );
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    &:hover {
        transform: translateY(-8px) scale(1.015);
        box-shadow: 0 18px 35px rgba(0, 0, 0, 0.2);

        &::before {
            opacity: 1;
        }

        ${IconWrapper} {
            transform: scale(1.08) rotate(5deg);
            box-shadow: 0 0 25px rgba(74, 222, 128, 0.3);
        }
    }

    @media (max-width: 768px) {
        padding: 2rem 1.5rem;
    }
`;

const CardTitle = styled.h3`
    font-size: 1.5rem;
    color: #4ade80;
    margin-bottom: 0.5rem;
    font-weight: 600;
    text-shadow: 0 0 10px rgba(74, 222, 128, 0.3);

    @media (max-width: 768px) {
        font-size: 1.1rem;
        margin-bottom: 0.3rem;
    }
`;

const CardDescription = styled.p`
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.6;
    position: relative;
    z-index: 1;

    @media (max-width: 768px) {
        font-size: 0.85rem;
        line-height: 1.4;
    }
`;

const CardsContainer = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(2, minmax(300px, 450px));
    gap: 2.5rem;
    width: 95%;
    max-width: 1400px;
    margin: 0 auto;
    position: relative;
    z-index: 20;
    padding: 1rem;
    perspective: 1000px;
    justify-content: center;

    @media (max-width: 1024px) {
        grid-template-columns: repeat(2, minmax(280px, 400px));
        gap: 2rem;
    }

    @media (max-width: 768px) {
        grid-template-columns: repeat(2, minmax(150px, 1fr));
        gap: 1.5rem;
        padding: 0.5rem;
        width: 90%;
    }

    @media (max-width: 480px) {
        width: 95%;
        gap: 1rem;
    }
`;

const ModalOverlay = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(5px);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
`;

const ModalCard = styled(motion.div)`
    background: rgba(5, 46, 22, 0.95);
    border-radius: 20px;
    padding: 2.5rem;
    max-width: 500px;
    width: 90%;
    border: 1px solid rgba(74, 222, 128, 0.3);
    box-shadow: 0 0 30px rgba(74, 222, 128, 0.2);
    position: relative;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 15px;
    right: 15px;
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.8);
    cursor: pointer;
    padding: 5px;
    
    &:hover {
        color: #4ade80;
    }
`;

const instructions = [
    {
        icon: <PlayCircle />,
        title: "Start Your Journey",
        description: "Click the Start Game button on the landing page to begin your adventure."
    },
    {
        icon: <Map />,
        title: "Explore the Map",
        description: "Navigate through a 2D map using your character to discover various locations."
    },
    {
        icon: <BookOpen />,
        title: "Access Resources",
        description: "Engage with educational resources, games, and challenges at different levels on the map."
    },
    {
        icon: <Trophy />,
        title: "Level Up",
        description: "Complete all games and challenges on Level 1 map to unlock the next exciting level."
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2
        }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 30, rotateX: -30 },
    visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1]
        }
    }
};

function HowToPlay() {
    useScrollAnimation();
    const controls = useAnimation();
    const [selectedCard, setSelectedCard] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const cards = document.querySelectorAll('.how-to-play-card');
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                card.style.setProperty('--mouse-x', `${x}%`);
                card.style.setProperty('--mouse-y', `${y}%`);
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleCardClick = (index) => {
        if (isMobile) {
            setSelectedCard(index);
        }
    };

    const closeModal = () => {
        setSelectedCard(null);
    };

    return (
        <HowToPlaySection id="howtoplay">
            <Background 
                animate={{
                    background: [
                        'linear-gradient(120deg, rgba(5, 46, 22, 0.92) 0%, rgba(5, 46, 22, 0.96) 100%)',
                        'linear-gradient(120deg, rgba(5, 46, 22, 0.96) 0%, rgba(5, 46, 22, 0.92) 100%)'
                    ]
                }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            />
            <ContentContainer>
                <Title className='font-main text-white'>How To Play</Title>
                <CardsContainer
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {instructions.map((instruction, index) => (
                        <Card 
                            key={index} 
                            variants={cardVariants}
                            className="how-to-play-card"
                            onClick={() => handleCardClick(index)}
                            whileHover={{ scale: 1.02 }}
                        >
                            <IconWrapper>
                                {instruction.icon}
                            </IconWrapper>
                            <CardTitle>{instruction.title}</CardTitle>
                            {!isMobile && (
                                <CardDescription className='font-main'>{instruction.description}</CardDescription>
                            )}
                        </Card>
                    ))}
                </CardsContainer>

                {isMobile && selectedCard !== null && (
                    <ModalOverlay
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeModal}
                    >
                        <ModalCard
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <CloseButton onClick={closeModal}>✕</CloseButton>
                            <IconWrapper style={{ marginBottom: '1rem' }}>
                                {instructions[selectedCard].icon}
                            </IconWrapper>
                            <CardTitle style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>
                                {instructions[selectedCard].title}
                            </CardTitle>
                            <CardDescription>
                                {instructions[selectedCard].description}
                            </CardDescription>
                        </ModalCard>
                    </ModalOverlay>
                )}
            </ContentContainer>
        </HowToPlaySection>
    );
}

export default HowToPlay;