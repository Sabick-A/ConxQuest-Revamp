import React, { useEffect, useState, useRef } from 'react';
import KeyBind from '../common/KeyBind';
import { backgroundImage } from '../../assets/images/Map';

const MapView = ({ onClose }) => {
    const [scale, setScale] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const mapContainerRef = useRef(null);


    useEffect(() => {
        const img = new Image();
        img.src = backgroundImage.src;
        
    
        if (img.complete) {
            setIsLoading(false);
        } else {
            img.onload = () => {
                setIsLoading(false);
            };
        }

        return () => {
            img.onload = null;
        };
    }, []);

    useEffect(() => {
        const handleKeyPress = (e) => {
            switch(e.key.toLowerCase()) {
                case '+':
                case '=':
                    e.preventDefault();
                    setScale(prev => Math.min(prev + 0.2, 3));
                    break;
                case '-':
                case '_':
                    e.preventDefault();
                    setScale(prev => Math.max(prev - 0.2, 0.5));
                    break;
                default:
                    onClose();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-blackw bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-whitesmoke p-8 rounded-2xl w-[800px] max-w-[95vw] h-[800px] max-h-[95vh] relative border-2 border-green-700 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                {/* Header */}
                <div className="flex justify-between items-center mb-4 pb-2 border-b-2 border-green-700 border-opacity-30">
                    <h2 className="text-2xl text-green-700 font-game tracking-wider">WORLD MAP</h2>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-green-700">
                            <span className="text-sm">Zoom:</span>
                            <KeyBind>+</KeyBind>
                            <KeyBind>-</KeyBind>
                        </div>
                        <div className="flex items-center gap-2 text-green-700">
                            <span className="text-sm">Close:</span>
                            <KeyBind>Any</KeyBind>
                        </div>
                    </div>
                </div>

                {/* Map Container */}
                <div 
                    ref={mapContainerRef}
                    className="w-full h-[calc(100%-7rem)] overflow-auto bg-[#2a7299] rounded-lg border-2 border-green-700 border-opacity-30"
                >
                    {isLoading ? (
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="text-green-700 font-game text-xl animate-pulse">
                                Loading Map...
                            </div>
                        </div>
                    ) : (
                        <div 
                            className="w-full h-full flex items-center justify-center"
                            style={{ 
                                transform: `scale(${scale})`,
                                transformOrigin: '0 0'
                            }}
                        >
                            <img 
                                src={backgroundImage.src} 
                                alt="World Map" 
                                className="w-full h-full object-contain"
                                style={{ imageRendering: 'pixelated' }}
                            />
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="mt-2 pt-2 border-t-2 border-green-700 font-bold border-opacity-30 text-center text-sm">
                    <div className="text-green-700 mb-1">Navigation Tips:</div>
                    <div className="text-gray-600">
                        Use mouse to scroll • Press + or - to zoom • Press any key to close
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MapView;
