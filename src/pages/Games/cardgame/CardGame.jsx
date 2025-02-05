import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import heartImage from './images/heart.png';
import cardWhite from './images/card_white.png';
import card1 from './images/card_1.jpg';
import card2 from './images/card_2.jpg';
import card3 from './images/card_3.jpg';
import card4 from './images/card_4.jpg';
import card5 from './images/card_5.jpg';
import card6 from './images/card_6.jpg';
import card7 from './images/card_7.jpg';
import card8 from './images/card_8.jpg';
import bg1 from './images/bg1.jpeg';

const cardImages = [card1, card2, card3, card4, card5, card6, card7, card8];

const QUESTIONS = [
    [
        "While DPSPs are not enforceable by courts, the government is constitutionally obligated to prioritize them over Fundamental Rights when forming policies.",
        0,
    ],
    ["Children under the age of 14 are allowed to work for jobs.", 0],
    [
        "Children should not be forced to work in jobs that are not suitable for their age and strength.",
        1,
    ],
    [
        "Every child has the right to early childhood care and education until they turn six.",
        1,
    ],
    [
        "Children in India have the right to be protected from discrimination based on their religion or caste.",
        1,
    ],
    ["Children can be forced into labor in India.", 0],
    [
        "Children have the right to be protected from social injustice and exploitation.",
        1,
    ],
    [
        "The government has a duty to improve public health and nutrition for children.",
        1,
    ],
];

const CardGame = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const fromMap = location.state?.fromMap;
    const playerPosition = location.state?.playerPosition;
    const [life, setLife] = useState(3);
    const [ncard, setNcard] = useState(8);
    const [questions, setQuestions] = useState([]);
    const [showDialog, setShowDialog] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [selectedCard, setSelectedCard] = useState(null);
    const [gameResult, setGameResult] = useState(null);
    const [flippedCards, setFlippedCards] = useState(new Set());
    const [showInstructions, setShowInstructions] = useState(true);

    useEffect(() => {
        // Shuffle questions on component mount
        const shuffledQuestions = [...QUESTIONS].sort(() => Math.random() - 0.5);
        setQuestions(shuffledQuestions);
    }, []);

    const handleCardClick = (index) => {
        if (flippedCards.has(index)) return;
        
        setCurrentQuestion(questions[index]);
        setSelectedCard(index);
        setShowDialog(true);
        setFlippedCards(prev => new Set([...prev, index]));
    };

    const handleBackToMap = () => {
        if (fromMap) {
            // Get the saved game state
            const savedState = localStorage.getItem('lastGameState');
            if (savedState) {
                // Navigate back to map with the saved state
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
            navigate('/');
        }
    };

    const handleGameEnd = (hasWon) => {
        setGameResult(hasWon ? 'YOU WON!' : 'YOU LOSE');
        setShowPopup(true);

        // Dispatch game completion event if coming from map
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
            // Get the saved game state
            const savedState = localStorage.getItem('lastGameState');
            
            // Ensure progress is updated before navigation
            const currentProgress = parseInt(localStorage.getItem('gameProgress') || '0');
            const newProgress = Math.min(currentProgress + 25, 100);
            localStorage.setItem('gameProgress', newProgress);
            
            // Dispatch event for progress update
            window.dispatchEvent(new CustomEvent('gameComplete', {
                detail: { 
                    success: true,
                    gameState: savedState ? JSON.parse(savedState) : null
                }
            }));

            // Navigate after progress update
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
        }
    };

    const handleAnswer = (isTrue) => {
        setShowDialog(false);
        const isCorrect = (currentQuestion[1] === 1) === isTrue;
        
        if (!isCorrect) {
            setLife(prev => prev - 1);
        }
        
        setNcard(prev => prev - 1);

        // Check game end conditions
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
            
            {/* Instructions Modal */}
            {showInstructions && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 z-50 animate-fadeIn">
                    <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900 rounded-2xl p-2 w-[95vw] sm:w-[90vw] md:w-[80vw] max-w-xl shadow-[0_0_30px_rgba(167,139,250,0.2)] transform transition-all animate-scaleIn max-h-[90vh] overflow-auto">
                        <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-3 sm:p-4 md:p-8 text-center space-y-3 sm:space-y-4 md:space-y-8">
                            <div className="relative">
                                <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-violet-400/10 to-transparent rounded-bl-full" />
                                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-tr from-violet-400/10 to-transparent rounded-tr-full" />
                                
                                <h2 className="text-3xl font-bold mb-6">
                                    <span className="bg-gradient-to-r from-indigo-700 to-purple-900 text-transparent bg-clip-text">
                                        How to Play
                                    </span>
                                </h2>

                                <div className="space-y-4 text-left">
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold shrink-0">
                                            1
                                        </div>
                                        <p className="text-gray-700">You have <span className="font-bold text-indigo-700">3 lives</span> to complete the game. Each wrong answer costs one life.</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold shrink-0">
                                            2
                                        </div>
                                        <p className="text-gray-700">Click on the cards to reveal questions about children's rights.</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold shrink-0">
                                            3
                                        </div>
                                        <p className="text-gray-700">Answer all questions correctly before running out of lives to win!</p>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowInstructions(false)}
                                className="relative group px-8 py-4 bg-gradient-to-br from-indigo-500 to-violet-600 text-white rounded-xl hover:from-indigo-600 hover:to-violet-700 transition-all font-bold shadow-lg hover:shadow-violet-500/30 transform hover:-translate-y-0.5 active:translate-y-0 overflow-hidden"
                            >
                                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                <span className="relative">Start Game</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Navbar */}
            <nav className="w-full flex justify-between items-center p-2 sm:p-3 lg:p-4 relative z-10 bg-gradient-to-b from-black/30 to-transparent h-[8vh] min-h-[40px] max-h-[80px]">
                <button 
                    onClick={handleBackToMap}
                    className="relative group flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 
                             bg-gradient-to-br from-violet-600/90 to-indigo-600/90 hover:from-violet-500/90 hover:to-indigo-500/90
                             rounded-xl border border-white/10 backdrop-blur-sm
                             shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30
                             transform hover:-translate-y-0.5 active:translate-y-0 
                             transition-all duration-200"
                >
                    <div className="relative flex items-center gap-1.5 sm:gap-2">
                        <div className="p-1 rounded-lg bg-white/10">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-white/90" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2.5} 
                                    d="M15 19l-7-7 7-7" 
                                />
                            </svg>
                        </div>
                        <span className="text-xs sm:text-sm md:text-base font-semibold text-white/90">
                            Back to Map
                        </span>
                    </div>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-400/0 via-violet-400/20 to-violet-400/0 opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-700" />
                </button>
                <h1 className="text-base sm:text-lg md:text-2xl lg:text-4xl font-nerko bg-gradient-to-r from-violet-300 via-purple-400 to-violet-300 text-transparent bg-clip-text animate-gradient">
                    Card Quest
                </h1>
                <div className="flex gap-1 sm:gap-1.5 md:gap-2">
                    {[...Array(3)].map((_, i) => (
                        <img
                            key={i}
                            src={heartImage}
                            alt="life"
                            className={`w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 transition-all duration-1000 hover:scale-110 ${
                                i >= life ? 'opacity-0 scale-50 saturate-0' : 'opacity-100 hover:drop-shadow-[0_0_8px_rgba(167,139,250,0.5)]'
                            }`}
                        />
                    ))}
                </div>
            </nav>

            {/* Card Grid */}
            <div className="h-[calc(92vh)] w-full max-w-7xl mx-auto px-2 sm:px-3 md:px-6 lg:px-8 relative z-10">
                <div className="grid h-full w-full grid-cols-3 md:grid-cols-4 place-items-center content-center gap-1.5 sm:gap-2 md:gap-3">
                    {cardImages.map((cardImage, index) => (
                        <div key={index} className="w-full h-[calc(30vh-1rem)] sm:h-[calc(35vh-1rem)] md:h-[calc(40vh-1rem)] lg:h-[calc(45vh-1rem)] relative perspective-1000 group">
                            <div 
                                className={`w-full h-full transition-all duration-500 transform-style-3d cursor-pointer group-hover:scale-[1.02] 
                                          ${flippedCards.has(index) ? 'rotate-y-180' : ''}`}
                                onClick={() => handleCardClick(index)}
                            >
                                <div className={`absolute w-full h-full backface-hidden transition-all duration-500 ${
                                    flippedCards.has(index) ? 'opacity-0' : 'opacity-100'
                                }`}>
                                    <img 
                                        src={cardImage}
                                        alt={`Card ${index + 1}`}
                                        className="w-full h-full object-cover rounded-lg md:rounded-xl border border-white/50 md:border-2 shadow-lg hover:shadow-violet-400/30 transition-shadow duration-300"
                                        onDragStart={(e) => e.preventDefault()}
                                    />
                                    <div className="absolute inset-0 rounded-lg md:rounded-xl bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                                <div className={`absolute w-full h-full backface-hidden rotate-y-180 transition-all duration-500 ${
                                    flippedCards.has(index) ? 'opacity-100' : 'opacity-0'
                                }`}>
                                    <img 
                                        src={cardWhite}
                                        alt="Card back"
                                        className="w-full h-full object-cover rounded-lg md:rounded-xl border border-white/50 md:border-2 shadow-lg hover:shadow-violet-400/30 transition-shadow duration-300"
                                        onDragStart={(e) => e.preventDefault()}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Question Dialog */}
            {showDialog && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 z-50 animate-fadeIn">
                    <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900 rounded-2xl p-2 w-[95vw] sm:w-[90vw] md:w-[80vw] max-w-xl shadow-[0_0_30px_rgba(167,139,250,0.2)] transform transition-all animate-scaleIn max-h-[90vh] overflow-auto">
                        <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-3 sm:p-4 md:p-8 space-y-3 sm:space-y-4 md:space-y-8">
                            <div className="relative bg-gradient-to-br from-white to-slate-50 rounded-xl shadow-lg border border-violet-200/50 p-3 sm:p-4 md:p-8 overflow-hidden">
                                {/* Decorative Elements */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-400/10 to-transparent rounded-bl-full" />
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-violet-400/10 to-transparent rounded-tr-full" />
                                
                                <h3 className="text-indigo-900 text-2xl font-bold mb-6 relative">
                                    <span className="bg-gradient-to-r from-indigo-700 to-purple-900 text-transparent bg-clip-text">
                                        Question:
                                    </span>
                                </h3>
                                <p className="text-gray-700 text-xl font-medium leading-relaxed relative">
                                    {currentQuestion[0]}
                                </p>
                            </div>
                            <div className="flex gap-2 sm:gap-3 md:gap-6 justify-center pt-2">
                                <button
                                    onClick={() => handleAnswer(true)}
                                    className="relative group px-4 sm:px-6 md:px-10 py-2 sm:py-3 md:py-4 bg-gradient-to-br from-indigo-500 to-violet-600 text-white rounded-lg sm:rounded-xl hover:from-indigo-600 hover:to-violet-700 transition-all font-bold shadow-lg hover:shadow-violet-500/30 transform hover:-translate-y-0.5 active:translate-y-0 overflow-hidden text-xs sm:text-sm md:text-base"
                                >
                                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                    <span className="relative">Right</span>
                                </button>
                                <button
                                    onClick={() => handleAnswer(false)}
                                    className="relative group px-4 sm:px-6 md:px-10 py-2 sm:py-3 md:py-4 bg-gradient-to-br from-rose-500 to-pink-600 text-white rounded-lg sm:rounded-xl hover:from-rose-600 hover:to-pink-700 transition-all font-bold shadow-lg hover:shadow-rose-500/30 transform hover:-translate-y-0.5 active:translate-y-0 overflow-hidden text-xs sm:text-sm md:text-base"
                                >
                                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                    <span className="relative">Wrong</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Game Over Popup */}
            {showPopup && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 z-50 animate-fadeIn">
                    <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900 rounded-2xl p-2 w-[95vw] sm:w-[90vw] md:w-[80vw] max-w-sm shadow-[0_0_30px_rgba(167,139,250,0.2)] transform transition-all animate-scaleIn max-h-[90vh] overflow-auto">
                        <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-3 sm:p-4 md:p-8 text-center space-y-3 sm:space-y-4 md:space-y-6">
                            {/* Decorative Elements */}
                            <div className="relative">
                                <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-violet-400/10 to-transparent rounded-bl-full" />
                                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-tr from-violet-400/10 to-transparent rounded-tr-full" />
                                
                                <h2 className="text-4xl font-bold relative">
                                    <span className={`bg-gradient-to-r ${gameResult === 'YOU WON!' 
                                        ? 'from-amber-500 to-yellow-600' 
                                        : 'from-indigo-700 to-purple-900'} text-transparent bg-clip-text`}>
                                        {gameResult === 'YOU WON!' ? 'Victory!' : 'Game Over'}
                                    </span>
                                </h2>
                                <p className={`text-3xl font-bold mt-4 bg-gradient-to-r ${gameResult === 'YOU WON!' 
                                    ? 'from-amber-400 to-yellow-600' 
                                    : 'from-violet-600 to-purple-800'} text-transparent bg-clip-text animate-pulse`}>
                                    {gameResult}
                                </p>
                            </div>
                            <div className="space-y-4 pt-4 relative">
                                {gameResult === 'YOU WON!' ? (
                                    <button
                                        onClick={handleContinueJourney}
                                        className="relative group w-full px-8 py-4 bg-gradient-to-br from-indigo-500 to-violet-600 text-white rounded-xl hover:from-indigo-600 hover:to-violet-700 transition-all text-lg font-bold shadow-lg hover:shadow-violet-500/30 transform hover:-translate-y-0.5 active:translate-y-0 overflow-hidden"
                                    >
                                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                        <span className="relative">Continue Your Journey</span>
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            onClick={resetGame}
                                            className="relative group w-full px-8 py-4 bg-gradient-to-br from-indigo-500 to-violet-600 text-white rounded-xl hover:from-indigo-600 hover:to-violet-700 transition-all font-bold shadow-lg hover:shadow-violet-500/30 transform hover:-translate-y-0.5 active:translate-y-0 overflow-hidden"
                                        >
                                            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                            <span className="relative">Retry</span>
                                        </button>
                                        <button
                                            onClick={handleBackToMap}
                                            className="relative group w-full px-8 py-4 bg-gradient-to-br from-amber-500 to-yellow-600 text-white rounded-xl hover:from-amber-600 hover:to-yellow-700 transition-all font-bold shadow-lg hover:shadow-amber-500/30 transform hover:-translate-y-0.5 active:translate-y-0 overflow-hidden"
                                        >
                                            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                            <span className="relative">Back to Map</span>
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CardGame; 