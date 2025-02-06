import React from 'react';

const QuestionDialog = ({ showDialog, currentQuestion, handleAnswer }) => {
    if (!showDialog) return null;

    return (
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
    );
};

export default QuestionDialog;
