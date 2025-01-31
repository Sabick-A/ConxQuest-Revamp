import React from 'react';

const PopupOverlay = ({ result, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-[#203260] p-8 rounded-xl border-2 border-green-700 shadow-[0_0_15px_rgba(34,197,94,0.3)] text-center">
                <h2 className="text-4xl mb-8 font-nerko">
                    {result === 'win' ? 'YOU WON!' : 'YOU LOSE!'}
                </h2>
                
                <button
                    onClick={onClose}
                    className="px-8 py-3 bg-green-700 hover:bg-green-600 rounded-lg transition-colors font-bold"
                >
                    Return to Map
                </button>
            </div>
        </div>
    );
};

export default PopupOverlay;
