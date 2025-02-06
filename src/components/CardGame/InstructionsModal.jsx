import React from 'react';

const InstructionsModal = ({ showInstructions, setShowInstructions }) => {
    if (!showInstructions) return null;

    return (
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
    );
};

export default InstructionsModal;
