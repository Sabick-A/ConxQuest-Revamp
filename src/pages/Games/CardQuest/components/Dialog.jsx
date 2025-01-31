import React from 'react';

const Dialog = ({ question, onAnswer }) => {
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-[#203260] p-8 rounded-xl border-2 border-green-700 shadow-[0_0_15px_rgba(34,197,94,0.3)] max-w-2xl w-[90%] text-center">
                <h2 className="text-2xl mb-8 font-nerko">Choose True or False</h2>
                
                <div className="bg-[#1a2b52] p-6 rounded-lg mb-8">
                    <p className="text-lg">{question}</p>
                </div>
                
                <div className="flex justify-center gap-4">
                    <button
                        onClick={() => onAnswer(true)}
                        className="px-8 py-3 bg-green-700 hover:bg-green-600 rounded-lg transition-colors font-bold"
                    >
                        True
                    </button>
                    <button
                        onClick={() => onAnswer(false)}
                        className="px-8 py-3 bg-red-700 hover:bg-red-600 rounded-lg transition-colors font-bold"
                    >
                        False
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dialog;
