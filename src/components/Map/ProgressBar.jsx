import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Progress = styled.div`
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: 75px;
  height: 25px;
  width: 35vw;
  
  border-radius: 12px;
  padding: 3px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5),
              inset 0 0 15px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(128, 128, 255, 0.2);
  backdrop-filter: blur(5px);
`;

const LoadingBar = styled.div`
  height: 100%;
  width: ${props => props.progress+25 || '25'}%;
  background: whitesmoke;
  border-radius: 8px;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  transition: width 0.3s ease-in-out;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.1) 100%
    );
    border-radius: inherit;
    animation: shine 1.5s infinite;
  }

  &::after {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: black;
    font-size: 0.85rem;
    font-weight: bold;
    text-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
    white-space: nowrap;
  }

  @keyframes shine {
    0% {
      background-position: -200% center;
    }
    100% {
      background-position: 200% center;
    }
  }
`;

const LevelText = styled.span`
  position: absolute;
  top: -25px;
  color: #fff;
  width:100%;
  text-align:center;
  font-weight: bold;
  font-size: 1rem;
  text-shadow: 0 0 5px rgba(64, 162, 227, 0.8),
               0 0 10px rgba(115, 103, 240, 0.8);
  letter-spacing: 1px;
`;

function ProgressBar() {
    const [progress, setProgress] = useState(() => {
        return parseInt(localStorage.getItem('gameProgress') || '0');
    });

    useEffect(() => {
  
        const handleStorageChange = () => {
            const newProgress = parseInt(localStorage.getItem('gameProgress') || '0');
            setProgress(newProgress);
        };

        const handleGameComplete = () => {
            const newProgress = parseInt(localStorage.getItem('gameProgress') || '0');
            setProgress(newProgress);
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('gameComplete', handleGameComplete);

        return () => {
     
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('gameComplete', handleGameComplete);
        };
    }, []);


    return (
        <Progress>
            <LoadingBar progress={progress} />
            <LevelText className="font-game">Lvl 1</LevelText>
        </Progress>
    );
}

export default ProgressBar;
