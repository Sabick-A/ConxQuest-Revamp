import React from 'react';

const Card = ({ index, onClick, isFlipped }) => {
    return (
        <div 
            className="aspect-[3/4] cursor-pointer group perspective"
            onClick={onClick}
        >
            <div className={`relative preserve-3d w-full h-full duration-500 ${isFlipped ? 'rotate-y-180' : ''}`}>
                {/* Front */}
                <div className="absolute inset-0 backface-hidden">
                    <img 
                        src={`/cardgame/images/card_${index}.jpg`}
                        alt={`Card ${index}`}
                        className="w-full h-full object-cover rounded-lg shadow-lg"
                    />
                </div>
                
                {/* Back */}
                <div className="absolute inset-0 rotate-y-180 backface-hidden">
                    <img 
                        src="/cardgame/images/card_white.png"
                        alt="Card back"
                        className="w-full h-full object-cover rounded-lg shadow-lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default Card;
