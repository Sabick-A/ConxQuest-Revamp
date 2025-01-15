import React, { useState, useEffect } from "react";
import styled from "styled-components";
import backgroundImage from "../../assets/images/Home/background.jpg";
import logo from "../../assets/images/common/logo.png";
import { Link } from "react-router-dom";

const StyledWrapper = styled.div`
    button {
        position: relative;
        margin: 0;
        padding: 17px 35px;
        outline: none;
        text-decoration: none;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        text-transform: uppercase;
        border: 3px solid white;
        border-radius: 10px;
        color: white;
        font-weight: 800;
        font-family: "Rubik Bubbles";
        z-index: 0;
        overflow: hidden;
        transition: all 0.3s cubic-bezier(0.02, 0.01, 0.47, 1);
    }

    button span {
        color: white;
        font-size: 14px;
        font-weight: 800;
        letter-spacing: 0.7px;
    }

    button:hover {
        animation: rotate624 0.7s ease-in-out both;
    }

    button:hover span {
        animation: storm1261 0.7s ease-in-out both;
        animation-delay: 0.06s;
    }

    @keyframes rotate624 {
        0% {
            transform: rotate(0deg) translate3d(0, 0, 0);
        }

        25% {
            transform: rotate(3deg) translate3d(0, 0, 0);
        }

        50% {
            transform: rotate(-3deg) translate3d(0, 0, 0);
        }

        75% {
            transform: rotate(1deg) translate3d(0, 0, 0);
        }

        100% {
            transform: rotate(0deg) translate3d(0, 0, 0);
        }
    }

    @keyframes storm1261 {
        0% {
            transform: translate3d(0, 0, 0) translateZ(0);
        }

        25% {
            transform: translate3d(4px, 0, 0) translateZ(0);
        }

        50% {
            transform: translate3d(-3px, 0, 0) translateZ(0);
        }

        75% {
            transform: translate3d(2px, 0, 0) translateZ(0);
        }

        100% {
            transform: translate3d(0, 0, 0) translateZ(0);
        }
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
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(${props => props.image});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: ${props => props.loaded ? 1 : 0};
    transition: opacity 0.5s ease-in-out;
    position: relative;

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

    return (
        <BackgroundContainer image={backgroundImage} loaded={imagesLoaded}>
            <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 flex flex-col items-center -translate-y-1/2 z-10">
                <img 
                    src={logo} 
                    alt="Logo" 
                    className={`animate-bounce mb-5 transition-opacity duration-500 ${imagesLoaded ? 'opacity-100' : 'opacity-0'}`}
                />
                <StyledWrapper>
                    <Link to="/map">
                        <button className="btn-shine">
                            <span>Start Game</span>
                        </button>
                    </Link>
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
