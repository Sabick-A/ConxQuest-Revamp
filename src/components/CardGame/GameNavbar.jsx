import React from 'react';
import { heartImage } from '../../assets/images/cardgame';

const GameNavbar = ({ life, handleBackToMap }) => {
    return (
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
    );
};

export default GameNavbar;
