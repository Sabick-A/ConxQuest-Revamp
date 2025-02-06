import React from 'react';

const GameOverPopup = ({ showPopup, gameResult, handleContinueJourney, resetGame, handleBackToMap }) => {
    if (!showPopup) return null;

    return (
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
    );
};

export default GameOverPopup;
