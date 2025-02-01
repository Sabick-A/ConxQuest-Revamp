import React, { useState, useEffect } from "react";
import styled from "styled-components";
import backgroundImage from "../../assets/images/Home/background.jpg";
import logo from "../../assets/images/common/logo.png";
import { useNavigate } from "react-router-dom";
import Alert from "../common/Alert";
import Message from "../common/Message";

const StyledWrapper = styled.div`
    button {
        width: 280px;
        height: 65px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        text-transform: uppercase;
        border: 3px solid rgba(255, 255, 255, 0.8);
        border-radius: 15px;
        color: white;
        font-weight: 800;
        font-family: "Rubik Bubbles";
        position: relative;
        overflow: hidden;
        transition: all 0.4s cubic-bezier(0.2, 0.6, 0.3, 1);
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(5px);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);

        @media (max-width: 768px) {
            width: 180px;
            height: 50px;
            border-width: 2px;
        }
    }

    button span {
        position: relative;
        z-index: 1;
        font-size: 16px;
        font-weight: 800;
        letter-spacing: 1px;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

        @media (max-width: 768px) {
            font-size: 15px;
            letter-spacing: 0.5px;
        }
    }

    button:hover {
        transform: translateY(-3px);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
        border-color: rgba(255, 255, 255, 1);
        background: rgba(255, 255, 255, 0.15);
    }

    .btn-shine {
        border: 3px solid;
        overflow: hidden;
        position: relative;
    }

    .btn-shine span {
        z-index: 20;
    }

    .btn-shine:after {
        background: #38ef7d;
        content: "";
        height: 155px;
        left: -75px;
        opacity: 0.4;
        position: absolute;
        top: -50px;
        transform: rotate(35deg);
        transition: all 550ms cubic-bezier(0.19, 1, 0.22, 1);
        width: 50px;
        z-index: -10;
    }

    .btn-shine:hover:after {
        left: 120%;
        transition: all 550ms cubic-bezier(0.19, 1, 0.22, 1);
    }
`;

const BackgroundContainer = styled.div`
    min-height: 100vh;
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(${props => props.$image});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: ${props => props.$loaded ? 1 : 0};
    transition: opacity 0.5s ease-in-out;

    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 30vh;
        background: linear-gradient(to bottom, transparent, rgba(20, 83, 45, 0.5) 50%, rgb(5, 46, 22));
        pointer-events: none;
    }
`;

const ScrollButton = styled.button`
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    background: transparent;
    border: none;
    cursor: pointer;
    transition: transform 0.3s ease;
    
    &:hover {
        transform: translateX(-50%) translateY(-5px);
    }

    .arrow {
        animation: bounce 2s infinite;
    }

    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-10px);
        }
        60% {
            transform: translateY(-5px);
        }
    }
`;

function Hero() {
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const loadImages = async () => {
            try {
                await Promise.all([
                    new Promise((resolve, reject) => {
                        const bgImg = new Image();
                        bgImg.src = backgroundImage;
                        bgImg.onload = resolve;
                        bgImg.onerror = reject;
                    }),
                    new Promise((resolve, reject) => {
                        const logoImg = new Image();
                        logoImg.src = logo;
                        logoImg.onload = resolve;
                        logoImg.onerror = reject;
                    })
                ]);
                setImagesLoaded(true);
            } catch (error) {
                console.error('Error loading images:', error);
                setImagesLoaded(true);
            }
        };

        loadImages();
    }, []);

    const scrollToAbout = () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const [alertVisible, setAlertVisible] = useState(false);
    const [messageVisible, setMessageVisible] = useState(false);
    const handleStartGameClick =()=>{
        if(window.innerWidth<=768){
            setAlertVisible(true);
        }else{
            setMessageVisible(true);
        }
    }

    return (
        <BackgroundContainer $image={backgroundImage} $loaded={imagesLoaded} id="home">
            { alertVisible && <Alert setVisible={setAlertVisible}/> }
            { messageVisible && <Message setVisible={setMessageVisible}/>}
            <div className="absolute top-[35%] left-1/2 transform -translate-x-1/2 flex flex-col items-center -translate-y-1/2 z-10">
                <img 
                    src={logo} 
                    alt="Logo" 
                    className={`animate-bounce  md:mb-5 mb-12 transition-all duration-700 transform hover:scale-110 ${imagesLoaded ? 'opacity-100 filter drop-shadow-2xl' : 'opacity-0'}`}
                />
                <StyledWrapper>
                        <button onClick={handleStartGameClick} className="btn-shine">
                            <span>Start Game</span>
                        </button>
                </StyledWrapper>
            </div>
            <ScrollButton 
                onClick={scrollToAbout}
                className={`transition-opacity duration-500 ${imagesLoaded ? 'opacity-100' : 'opacity-0'}`}
                aria-label="Scroll to About section"
            >
                <svg 
                    className="arrow w-8 h-8 text-white"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                </svg>
            </ScrollButton>
        </BackgroundContainer>
    );
}

export default Hero;
