import React from 'react';
import { cardWhite } from '../../assets/images/cardgame';

const CardGrid = ({ cardImages, flippedCards, handleCardClick }) => {
    return (
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
    );
};

export default CardGrid;
