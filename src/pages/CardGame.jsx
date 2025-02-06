import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    card1,
    card2,
    card3,
    card4,
    card5,
    card6,
    card7,
    card8,
    bg1
} from '../assets/images/cardgame';
import InstructionsModal from '../components/CardGame/InstructionsModal';
import GameNavbar from '../components/CardGame/GameNavbar';
import CardGrid from '../components/CardGame/CardGrid';
import QuestionDialog from '../components/CardGame/QuestionDialog';
import GameOverPopup from '../components/CardGame/GameOverPopup';

const cardImages = [card1, card2, card3, card4, card5, card6, card7, card8];

const QUESTIONS = [
    ["While DPSPs are not enforceable by courts, the government is constitutionally obligated to prioritize them over Fundamental Rights when forming policies.", 0],
    ["Children under the age of 14 are allowed to work for jobs.", 0],
    ["Children should not be forced to work in jobs that are not suitable for their age and strength.", 1],
    ["Every child has the right to early childhood care and education until they turn six.", 1],
    ["Children in India have the right to be protected from discrimination based on their religion or caste.", 1],
    ["Children can be forced into labor in India.", 0],
    ["Children have the right to be protected from social injustice and exploitation.", 1],
    ["The government has a duty to improve public health and nutrition for children.", 1],
    ["Citizens have the right to freely move and live anywhere within India's territory.", 1],
    ["The Constitution allows discrimination based on religion when applying for jobs.", 0],
    ["Parents have a fundamental duty to ensure education for children aged 6-14 years.", 1],
    ["Citizens can be punished multiple times for the same crime in India.", 0],
    ["The right to property is still considered a fundamental right in India.", 0],
    ["Citizens have the right to access information about government activities.", 1],
    ["Only certain religions are given special treatment under India's secular system.", 0],
    ["Citizens can be forced to testify against themselves in criminal cases.", 0],
    ["All citizens have a duty to protect and preserve the natural environment.", 1],
    ["The Constitution guarantees special privileges to certain social groups.", 0],
    ["Citizens have the right to practice and preserve their cultural traditions.", 1],
    ["People can be forced to work without payment in India.", 0],
    ["Citizens have a duty to stand during the National Anthem.", 1],
    ["The right to privacy requires consent before personal information disclosure.", 1],
    ["Only educated citizens have the right to vote in India.", 0],
    ["Citizens have a duty to promote harmony across religious and linguistic groups.", 1],
    ["The Constitution allows forced religious conversion.", 0],
    ["Every citizen has the duty to fight corruption and avoid bribery.", 1],
    ["Women and men have different fundamental rights under the Constitution.", 0],
    ["Citizens can choose any profession or business they want to pursue.", 1]
];

const CardGame = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const fromMap = location.state?.fromMap;
    const [life, setLife] = useState(3);
    const [ncard, setNcard] = useState(8);
    const [questions, setQuestions] = useState([]);
    const [showDialog, setShowDialog] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [gameResult, setGameResult] = useState(null);
    const [flippedCards, setFlippedCards] = useState(new Set());
    const [showInstructions, setShowInstructions] = useState(true);

    useEffect(() => {
        const shuffledQuestions = [...QUESTIONS].sort(() => Math.random() - 0.5);
        setQuestions(shuffledQuestions);
    }, []);

    const handleCardClick = (index) => {
        if (flippedCards.has(index)) return;
        
        setCurrentQuestion(questions[index]);
        setShowDialog(true);
        setFlippedCards(prev => new Set([...prev, index]));
    };

    const handleBackToMap = () => {
        if (fromMap) {
            const savedState = localStorage.getItem('lastGameState');
            if (savedState) {
                navigate('/map', {
                    state: { 
                        returnedFromGame: true,
                        gameState: JSON.parse(savedState)
                    }
                });
            } else {
                navigate('/map');
            }
        } else {
            navigate('/map');
        }
    };

    const handleGameEnd = (hasWon) => {
        setGameResult(hasWon ? 'YOU WON!' : 'YOU LOSE');
        setShowPopup(true);

        if (fromMap && hasWon) {
            window.dispatchEvent(new CustomEvent('gameComplete', {
                detail: { 
                    success: hasWon,
                    gameState: JSON.parse(localStorage.getItem('lastGameState'))
                }
            }));
        }
    };

    const handleContinueJourney = () => {
        if (fromMap) {
            const savedState = localStorage.getItem('lastGameState');
            
            const completedGames = JSON.parse(localStorage.getItem('completedGames') || '[]');
            const isGameCompleted = completedGames.includes('cardGame');
            
            if (!isGameCompleted) {
                const currentProgress = parseInt(localStorage.getItem('gameProgress') || '0');
                const newProgress = Math.min(currentProgress + 25, 100);
                localStorage.setItem('gameProgress', newProgress);
                
                completedGames.push('cardGame');
                localStorage.setItem('completedGames', JSON.stringify(completedGames));
                
                window.dispatchEvent(new CustomEvent('gameComplete', {
                    detail: { 
                        success: true,
                        gameState: savedState ? JSON.parse(savedState) : null
                    }
                }));

                if (savedState) {
                    navigate('/map', {
                        state: { 
                            returnedFromGame: true,
                            gameState: JSON.parse(savedState),
                            updatedProgress: newProgress
                        }
                    });
                } else {
                    navigate('/map', {
                        state: {
                            returnedFromGame: true,
                            updatedProgress: newProgress
                        }
                    });
                }
            } else {
                if (savedState) {
                    navigate('/map', {
                        state: { 
                            returnedFromGame: true,
                            gameState: JSON.parse(savedState)
                        }
                    });
                } else {
                    navigate('/map');
                }
            }
        }
    };

    const handleAnswer = (isTrue) => {
        setShowDialog(false);
        const isCorrect = (currentQuestion[1] === 1) === isTrue;
        
        if (!isCorrect) {
            setLife(prev => prev - 1);
        }
        
        setNcard(prev => prev - 1);

        if (ncard === 1 || life <= 1) {
            const hasWon = life > 1 && ncard === 1;
            handleGameEnd(hasWon);
        }
    };

    const resetGame = () => {
        setLife(3);
        setNcard(8);
        setShowPopup(false);
        setFlippedCards(new Set());
        setQuestions([...QUESTIONS].sort(() => Math.random() - 0.5));
    };

    return (
        <div className="h-screen w-screen overflow-hidden bg-gradient-to-b from-[rgba(30,27,75,0.95)] to-[rgba(17,24,39,0.98)] bg-cover bg-center text-white relative"
             style={{ 
                backgroundImage: `linear-gradient(0deg, rgba(30, 27, 75, 0.95) 0%, rgba(17, 24, 39, 0.98) 100%), url(${bg1})`,
                backgroundAttachment: 'fixed'
             }}>
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(167,139,250,0.1)_0%,transparent_70%)] animate-pulse" />
            
            <InstructionsModal 
                showInstructions={showInstructions}
                setShowInstructions={setShowInstructions}
            />

            <GameNavbar 
                life={life}
                handleBackToMap={handleBackToMap}
            />

            <CardGrid 
                cardImages={cardImages}
                flippedCards={flippedCards}
                handleCardClick={handleCardClick}
            />

            <QuestionDialog 
                showDialog={showDialog}
                currentQuestion={currentQuestion}
                handleAnswer={handleAnswer}
            />

            <GameOverPopup 
                showPopup={showPopup}
                gameResult={gameResult}
                handleContinueJourney={handleContinueJourney}
                resetGame={resetGame}
                handleBackToMap={handleBackToMap}
            />
        </div>
    );
};

export default CardGame; 