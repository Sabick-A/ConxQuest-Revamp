import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeInUp = keyframes`
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const bounce = keyframes`
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
`;

const float = keyframes`
    0% { transform: translateY(0px) rotate(0deg); }
    25% { transform: translateY(-10px) rotate(5deg); }
    75% { transform: translateY(-5px) rotate(-5deg); }
    100% { transform: translateY(0px) rotate(0deg); }
`;

const Word = styled.span`
    display: inline-block;
    opacity: 0;
    animation: ${fadeInUp} 0.5s ease-out forwards;
    animation-delay: ${props => props.delay}s;
    margin-right: 8px;
    
    &.highlight {
        color: #4ade80;
        font-weight: bold;
    }

    &.visible {
        animation: ${fadeInUp} 0.5s ease-out forwards,
                 ${bounce} 2s ease-in-out infinite;
        animation-delay: ${props => props.delay}s, ${props => props.delay + 0.5}s;
    }

    &:hover {
        transform: translateY(-2px);
        transition: transform 0.2s ease;
    }
`;

const Emoji = styled.span`
    display: inline-block;
    opacity: 0;
    animation: ${fadeInUp} 0.5s ease-out forwards,
              ${float} 3s ease-in-out infinite;
    animation-delay: ${props => props.delay}s, ${props => props.delay + 0.5}s;
    margin-left: 8px;
    font-size: 1.2em;
`;

const AnimatedText = ({ text, className }) => {
    const [showEmoji, setShowEmoji] = useState(false);
    const words = text.split(' ').filter(word => !word.match(/[\u{1F300}-\u{1F9FF}]/u));
    const highlightWords = ['ConxQuest', 'Constitution', 'interactive', 'adventure'];
    
    useEffect(() => {
        // Calculate when to show emoji based on the last word's animation
        const lastWordDelay = 0.5 + (words.length * 0.1);
        const timer = setTimeout(() => {
            setShowEmoji(true);
        }, (lastWordDelay + 0.5) * 1000); // Convert to milliseconds

        return () => clearTimeout(timer);
    }, [words.length]);

    return (
        <div className={className}>
            {words.map((word, index) => {
                const delay = 0.5 + (index * 0.1);
                const isHighlight = highlightWords.some(hw => 
                    word.toLowerCase().includes(hw.toLowerCase())
                );
                
                return (
                    <Word 
                        key={index} 
                        delay={delay}
                        className={`${isHighlight ? 'highlight' : ''} visible`}
                    >
                        {word}
                    </Word>
                );
            })}
            {showEmoji && (
                <Emoji delay={0}>
                    🌟
                </Emoji>
            )}
        </div>
    );
};

export default AnimatedText;
