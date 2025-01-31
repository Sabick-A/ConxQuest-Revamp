import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './components/Card';
import Dialog from './components/Dialog';
import PopupOverlay from './components/PopupOverlay';

const questions = [
    {
        text: "While DPSPs are not enforceable by courts, the government is constitutionally obligated to prioritize them over Fundamental Rights when forming policies.",
        answer: false,
    },
    {
        text: "Children under the age of 14 are allowed to work for jobs.",
        answer: false,
    },
    {
        text: "Children should not be forced to work in jobs that are not suitable for their age and strength.",
        answer: true,
    },
    {
        text: "Every child has the right to early childhood care and education until they turn six.",
        answer: true,
    },
    {
        text: "Children in India have the right to be protected from discrimination based on their religion or caste.",
        answer: true,
    },
    {
        text: "Children can be forced into labor in India.",
        answer: false,
    },
    {
        text: "Children have the right to be protected from social injustice and exploitation.",
        answer: true,
    },
    {
        text: "The government has a duty to improve public health and nutrition for children.",
        answer: true,
    },
];

const CardQuest = () => {
    const navigate = useNavigate();
    const [score, setScore] = useState(0);
    const [life, setLife] = useState(3);
    const [showDialog, setShowDialog] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [currentCardIndex, setCurrentCardIndex] = useState(null);
    const [shuffledQuestions] = useState(() => shuffleArray([...questions]));
    const [gameResult, setGameResult] = useState(null);

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const handleCardClick = (index) => {
        setCurrentCardIndex(index);
        setCurrentQuestion(shuffledQuestions[index]);
        setShowDialog(true);
    };

    const handleAnswer = (answer) => {
        const isCorrect = answer === currentQuestion.answer;
        
        if (!isCorrect) {
            setLife(prev => prev - 1);
        } else {
            setScore(prev => prev + 1);
        }

        setShowDialog(false);

        if (life === 1 && !isCorrect) {
            setGameResult('lose');
            setShowPopup(true);
        } else if (score === 7) {
            setGameResult('win');
            setShowPopup(true);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[rgba(167,119,49,0.7)] via-[rgba(32,50,96,0.9)] to-[rgba(32,45,83,0.9)] font-game text-white">
            {/* Navigation */}
            <div className="w-full flex justify-between items-center p-5">
                <button 
                    onClick={() => navigate('/map')}
                    className="text-white text-2xl hover:text-green-500 transition-colors"
                >
                    ←
                </button>
                <div className="text-4xl font-nerko">Card Quest</div>
                <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                        {[...Array(3)].map((_, i) => (
                            <img
                                key={i}
                                src="/cardgame/images/heart.png"
                                alt="life"
                                className={`w-10 transition-opacity duration-300 ${i >= life ? 'opacity-30' : 'opacity-100'}`}
                            />
                        ))}
                    </div>
                    <div className="text-xl">Score: {score}</div>
                </div>
            </div>

            {/* Card Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 max-w-6xl mx-auto">
                {shuffledQuestions.map((_, index) => (
                    <Card
                        key={index}
                        index={index + 1}
                        onClick={() => handleCardClick(index)}
                        isFlipped={currentCardIndex === index}
                    />
                ))}
            </div>

            {/* Dialog */}
            {showDialog && currentQuestion && (
                <Dialog
                    question={currentQuestion.text}
                    onAnswer={handleAnswer}
                />
            )}

            {/* Result Popup */}
            {showPopup && (
                <PopupOverlay
                    result={gameResult}
                    onClose={() => {
                        setShowPopup(false);
                        navigate('/map');
                    }}
                />
            )}
        </div>
    );
};

export default CardQuest;
