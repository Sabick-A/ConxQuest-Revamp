import React, { useState, useEffect, useMemo } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import AnimatedText from './AnimatedText';

const AboutSection = styled.div`
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(5, 46, 22);
    position: relative;
    overflow: hidden;
    margin-top: -2px; /* Add negative margin to remove gap */
    padding-top: 82px; /* Adjusted padding to compensate for negative margin */
`;

const Background = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    z-index: 1;
    background: linear-gradient(
        120deg,
        rgba(5, 46, 22, 0.95) 0%,
        rgba(5, 46, 22, 0.98) 100%
    );
`;

const StarField = styled(motion.div)`
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-content: space-around;
    opacity: 0.25;
`;

const Star = styled(motion.div)`
    position: absolute;
    width: ${(props) => props.size || "12px"};
    height: ${(props) => props.size || "12px"};
    clip-path: ${(props) => {
        switch(props.shape) {
            case 'triangle':
                return 'polygon(50% 0%, 0% 100%, 100% 100%)';
            case 'diamond':
                return 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)';
            case 'hexagon':
                return 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)';
            default:
                return `polygon(
                    50% 0%,
                    61% 35%,
                    98% 35%,
                    68% 57%,
                    79% 91%,
                    50% 70%,
                    21% 91%,
                    32% 57%,
                    2% 35%,
                    39% 35%
                )`;
        }
    }};
    background: ${(props) => 
        props.gradient ? 
        `linear-gradient(135deg, ${props.gradient.start} 0%, ${props.gradient.end} 100%)` :
        'linear-gradient(135deg, #4ade80 0%, #14532d 100%)'
    };
    opacity: ${(props) => props.brightness || 0.8};
    box-shadow: 0 0 ${(props) => props.glow || "8px"} ${(props) => props.glowColor || "rgba(74, 222, 128, 0.4)"};
`;

const Title = styled.h1`
    transform: translateY(20px);
    opacity: 0;
    transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
    font-size: 3.5rem;
    margin-bottom: 2rem;
    position: relative;
    
    .animate-in & {
        opacity: 1;
        transform: translateY(0);
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
            width: 80px;
            height: 3px;
        }
    }
    
    @media (max-width: 1024px) {
        font-size: 3rem;
    }

    @media (max-width: 768px) {
        font-size: 2.5rem;
        margin-bottom: 1.5rem;
    }

    @media (max-width: 480px) {
        font-size: 2rem;
        margin-bottom: 1rem;
    }
`;

const AnimatedContent = styled.div`
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    transition-delay: 200ms;

    .animate-in & {
        opacity: 1;
        transform: translateY(0);
    }
`;

const Content = styled.div`
    width: 75%;
    margin: 0 auto;
    position: relative;
    z-index: 1;
    transform: translateY(-20px);

    @media (max-width: 768px) {
        width: 90%;
    }
`;

function About() {
    useScrollAnimation();
    const [isVisible, setIsVisible] = useState(false);

    const shapes = useMemo(() => {
        const elements = [];
        // Stars (60)
        for (let i = 0; i < 60; i++) {
            const size = Math.floor(Math.random() * 12 + 8) + "px";
            const left = Math.floor(Math.random() * 100) + "%";
            const top = Math.floor(Math.random() * 100) + "%";
            const brightness = (Math.floor(Math.random() * 6) + 4) / 10;
            const glow = Math.floor(Math.random() * 12 + 6) + "px";
            const rotationDuration = 3 + Math.floor(i / 10) * 2;
            const scaleDuration = 2 + Math.floor(i / 8) * 1.5;

            elements.push(
                <Star
                    key={`star-${i}`}
                    size={size}
                    brightness={brightness}
                    glow={glow}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: brightness,
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 0],
                    }}
                    transition={{
                        opacity: { duration: 0.3, delay: i * 0.02 },
                        scale: {
                            repeat: Infinity,
                            duration: scaleDuration,
                            ease: "easeInOut",
                        },
                        rotate: {
                            repeat: Infinity,
                            duration: rotationDuration,
                            ease: "linear",
                        },
                    }}
                    style={{
                        position: "absolute",
                        left,
                        top,
                        filter: `hue-rotate(${Math.floor(Math.random() * 30)}deg)`,
                    }}
                />
            );
        }

        // Additional shapes (30)
        const shapes = ['triangle', 'diamond', 'hexagon'];
        const gradients = [
            { start: '#4ade80', end: '#14532d' },
            { start: '#22c55e', end: '#15803d' },
            { start: '#86efac', end: '#166534' }
        ];

        for (let i = 0; i < 30; i++) {
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            const gradient = gradients[Math.floor(Math.random() * gradients.length)];
            const size = Math.floor(Math.random() * 16 + 10) + "px";
            const left = Math.floor(Math.random() * 100) + "%";
            const top = Math.floor(Math.random() * 100) + "%";
            const brightness = (Math.floor(Math.random() * 4) + 2) / 10;
            const glow = Math.floor(Math.random() * 15 + 8) + "px";
            const rotationDuration = 4 + Math.floor(i / 8) * 2;
            const scaleDuration = 3 + Math.floor(i / 6) * 1.5;

            elements.push(
                <Star
                    key={`shape-${i}`}
                    shape={shape}
                    size={size}
                    brightness={brightness}
                    glow={glow}
                    gradient={gradient}
                    glowColor={`rgba(${shape === 'triangle' ? '134, 239, 172' : '74, 222, 128'}, 0.4)`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: brightness,
                        scale: [1, 1.3, 1],
                        rotate: [0, 360, 0],
                    }}
                    transition={{
                        opacity: { duration: 0.4, delay: i * 0.03 },
                        scale: {
                            repeat: Infinity,
                            duration: scaleDuration,
                            ease: "easeInOut",
                        },
                        rotate: {
                            repeat: Infinity,
                            duration: rotationDuration,
                            ease: "linear",
                        },
                    }}
                    style={{
                        position: "absolute",
                        left,
                        top,
                        filter: `hue-rotate(${Math.floor(Math.random() * 45)}deg)`,
                    }}
                />
            );
        }

        return elements;
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const aboutSection = document.getElementById('about');
            const aboutSectionTop = aboutSection.offsetTop;
            const aboutSectionHeight = aboutSection.offsetHeight;
            const viewportHeight = window.innerHeight;
            const scrollPosition = window.scrollY;

            if (scrollPosition + viewportHeight > aboutSectionTop + aboutSectionHeight / 2) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <AboutSection id='about'>
            <Background>
                <StarField>{shapes}</StarField>
            </Background>
            <Content className='w-9/12 text-center relative z-10 space-y-8 md:space-y-12'>
                <div className='animate-on-scroll'>
                    <Title className='text-white font-bold font-main'>
                        About
                    </Title>
                </div>
                <div className='animate-on-scroll'>
                    <AnimatedContent>
                        <AnimatedText 
                            key={isVisible ? 'visible' : 'hidden'}
                            text="Explore the vibrant ConxQuest Island, where learning meets adventure. Dive into interactive quests, solve engaging puzzles, and uncover the wonders of the Constitution. ConxQuest transforms education into an exciting treasure hunt, making every step of your learning experience unforgettable. 🌟"
                            className='text-white mt-6 md:mt-10 w-full md:w-2/3 text-base md:text-lg font-main mx-auto leading-relaxed'
                        />
                    </AnimatedContent>
                </div>
            </Content>
        </AboutSection>
    );
}

export default About;