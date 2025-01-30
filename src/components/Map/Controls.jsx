import React, { useEffect } from 'react';
import KeyBind from '../common/KeyBind';

const ControlRow = ({ keys, action, description }) => (
    <div className="flex items-center justify-between gap-4 bg-gray-800 bg-opacity-10 p-4 rounded-lg hover:bg-opacity-20 transition-all">
        <div className="flex items-center gap-3">
            {Array.isArray(keys) ? (
                <div className="flex gap-1">
                    {keys.map((key, index) => (
                        <KeyBind key={index}>{key}</KeyBind>
                    ))}
                </div>
            ) : (
                <KeyBind>{keys}</KeyBind>
            )}
            <span className="text-green-700 font-bold">{action}</span>
        </div>
        {description && (
            <span className="text-gray-600 text-sm italic">{description}</span>
        )}
    </div>
);

const Controls = ({ onClose }) => {
    useEffect(() => {
        const handleKeyPress = (e) => {
            e.preventDefault();
            onClose();
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [onClose]);

    const controls = [
        {
            keys: ['W', 'A', 'S', 'D'],
            action: 'Movement',
            description: 'Move around the game world'
        },
        {
            keys: 'X',
            action: 'Interact',
            description: 'Talk to NPCs, use objects , enter games'
        },
        {
            keys: 'ESC',
            action: 'Home',
            description: 'Return to main menu'
        },
        {
            keys: 'TAB',
            action: 'Map',
            description: 'View world map'
        },
        {
            keys: 'G',
            action: 'Guide',
            description: 'View buildings/objects and their purposes.'
        },
        {
            keys: 'C',
            action: 'Controls',
            description: 'Toggle this menu'
        }
    ];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-whitesmoke p-8 rounded-2xl w-[600px] relative border-2 border-green-700 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                {/* Header */}
                <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-green-700 border-opacity-30">
                    <h2 className="text-2xl text-green-700 font-game tracking-wider">GAME CONTROLS</h2>
                </div>

                {/* Controls Grid */}
                <div className="space-y-3">
                    {controls.map((control, index) => (
                        <ControlRow
                            key={index}
                            keys={control.keys}
                            action={control.action}
                            description={control.description}
                        />
                    ))}
                </div>

                {/* Footer */}
                <div className="mt-6 pt-4 border-t-2 border-green-700  font-bold animate-pulse border-opacity-30 text-center text-sm text-gray-600">
                    Press any key to continue your adventure
                </div>
            </div>
        </div>
    );
};

export default Controls;
