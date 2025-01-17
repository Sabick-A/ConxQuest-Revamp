import React, { useState, useEffect } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import styled from 'styled-components';
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

    @media (max-width: 768px) {
        padding-top: 200px;
        align-items: flex-start;
    }

    &::before {
        content: '';
        position: absolute;
        top: -50px; /* Extend the gradient upward */
        left: 0;
        right: 0;
        bottom: 0;
        background: 
            linear-gradient(180deg, rgba(5, 46, 22, 0) 0%, rgb(5, 46, 22) 50px),
            linear-gradient(120deg, rgba(74, 222, 128, 0.1) 0%, transparent 50%),
            linear-gradient(240deg, rgba(74, 222, 128, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(20, 83, 45, 0.8) 0%, rgb(5, 46, 22) 100%);
        pointer-events: none;
    }

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%234ade80' fill-opacity='0.05'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z'/%3E%3C/g%3E%3C/svg%3E");
        opacity: 0.4;
    }
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
    transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
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

    @media (max-width: 768px) {
        width: 90%;
    }
`;

function About() {
    useScrollAnimation();
    const [isVisible, setIsVisible] = useState(false);

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

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <AboutSection id='about'>
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