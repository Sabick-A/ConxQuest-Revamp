import React from 'react';
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

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 20vh;
        background: linear-gradient(to top, rgb(5, 46, 22), rgba(20, 83, 45, 0.5) 50%, transparent);
        pointer-events: none;
    }
`;

const Title = styled.h1`
    opacity: 0;
    transform: translateY(20px);
    animation: titleAppear 0.8s ease-out forwards;
    
    @keyframes titleAppear {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

function About() {
    useScrollAnimation();

    return (
        <AboutSection id="about">
            <div className='w-9/12 text-center relative z-10 space-y-12'>
                <div className='animate-on-scroll'>
                    <Title className='text-white text-6xl font-bold font-main'>
                        About
                    </Title>
                </div>
                <AnimatedText 
                    text="Explore the vibrant ConxQuest Island, where learning meets adventure. Dive into interactive quests, solve engaging puzzles, and uncover the wonders of the Constitution. ConxQuest transforms education into an exciting treasure hunt, making every step of your learning experience unforgettable. 🌟"
                    className='text-white mt-10 w-2/3 text-lg font-main mx-auto leading-relaxed'
                />
            </div>
        </AboutSection>
    );
}

export default About;