import React, { useEffect, useRef, useState } from "react";
import {
    initSprites,
    initiVectors,
    updateGameLogic,
    checkXButtonStatus,
} from "../utils/Map";
import { useKeyboard } from "../hooks/useKeyboard";
import Loader from "../components/Map/Loader/Loader";
import XBtn from "../components/Map/XBtn";
import Navbar from "../components/Map/Navbar";
import Controls from "../components/Map/Controls";

function Canvas() {
    const [loading, setLoading] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);
    const [xButton, setXButton] = useState(false);
    const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [minLoadingComplete, setMinLoadingComplete] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    const { keys, lastKey, handleKeyDown, handleKeyUp, animationIdRef } = useKeyboard();

    useEffect(() => {
        // Set background color when component mounts
        document.body.style.backgroundColor = '#2A7299';
        
        // Load Botpress scripts
        const injectScript = document.createElement('script');
        injectScript.src = 'https://cdn.botpress.cloud/webchat/v2.1/inject.js';
        injectScript.id = 'botpress-inject-script';

        const configScript = document.createElement('script');
        configScript.src = 'https://mediafiles.botpress.cloud/fb82c3c2-66cb-4282-86a2-ddafece5c8eb/webchat/v2.1/config.js';
        configScript.id = 'botpress-config-script';

        // Add scripts to head
        document.head.appendChild(injectScript);
        injectScript.onload = () => {
            document.head.appendChild(configScript);
        };
        
        // Cleanup function to reset background color and remove scripts when component unmounts
        return () => {
            document.body.style.backgroundColor = 'rgb(5 46 22)';
            
            // Remove Botpress scripts
            const injectScriptElement = document.getElementById('botpress-inject-script');
            const configScriptElement = document.getElementById('botpress-config-script');
            
            if (injectScriptElement) {
                injectScriptElement.remove();
            }
            if (configScriptElement) {
                configScriptElement.remove();
            }

            // Clean up any Botpress elements from the DOM
            const botpressElements = document.querySelectorAll('[class*="bp"]');
            botpressElements.forEach(element => element.remove());
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        contextRef.current = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Set minimum loading time of 2 seconds
        setTimeout(() => {
            setMinLoadingComplete(true);
        }, 1000);

        const offset = {
            x: -900 + (canvas.width - 1024) / 2,
            y: -2800 + (canvas.height - 576) / 2,
        };

        const { teleports, boundaries, interacts } = initiVectors(offset);
        const { background, player, foreground } = initSprites(canvas, offset);
        
        // Store game state
        const gameState = {
            isAnimating: true,
            player: player,
            background: background,
            foreground: foreground,
            boundaries: boundaries,
            teleports: teleports,
            interacts: interacts,
            offset: offset
        };

        // Add load event listeners to all images
        const imagesToLoad = [background.image, player.image, foreground.image];
        let loadedImages = 0;

        const handleImageLoad = () => {
            loadedImages++;
            if (loadedImages === imagesToLoad.length) {
                setImagesLoaded(true);
            }
        };

        imagesToLoad.forEach(img => {
            if (img.complete) {
                handleImageLoad();
            } else {
                img.addEventListener('load', handleImageLoad);
            }
            img.addEventListener('load', () => {
                img.removeEventListener('load', handleImageLoad);
            }, { once: true });
        });

        // Add event listeners
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        
        // Setup Botpress webchat event listeners
        const setupBotpressListener = () => {
            if (window.botpress) {
                // Handle bot open
                window.onBotOpen = () => {
                    console.log("Bot opened - pausing animation");
                    gameState.isAnimating = false;
                    if (animationIdRef.current) {
                        window.cancelAnimationFrame(animationIdRef.current);
                    }
                };

                // Handle bot close
                window.botpress.on('webchat:closed', () => {
                    console.log("Webchat closed - resuming animation");
                    gameState.isAnimating = true;
                    if (animationIdRef.current) {
                        window.cancelAnimationFrame(animationIdRef.current);
                    }
                    requestAnimationFrame(() => animate(gameState));
                });
            }
        };

        // Check if Botpress is already loaded
        if (window.botpress) {
            setupBotpressListener();
        } else {
            const botpressCheckInterval = setInterval(() => {
                if (window.botpress) {
                    setupBotpressListener();
                    clearInterval(botpressCheckInterval);
                }
            }, 100);
        }

        const movables = [
            background,
            ...boundaries,
            foreground,
            ...teleports,
            ...interacts,
        ];

        const animate = (state) => {
            if (!state.isAnimating ) return;
            
            contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
            const teleportActivated = updateGameLogic(
                contextRef.current,
                state.player,
                state.background,
                state.foreground,
                state.boundaries,
                state.teleports,
                state.interacts,
                keys.current,
                lastKey.current,
                movables
            );
            
            if (!teleportActivated) {
                animationIdRef.current = window.requestAnimationFrame(() => animate(state));
            }
            
            const xButtonActivated = checkXButtonStatus(
                state.player,
                state.teleports,
                state.interacts
            );
            setXButton(xButtonActivated);
            setPlayerPosition({
                x: state.player.position.x + state.player.width / 8,
                y: state.player.position.y + state.player.height / 2,
            });
        };

        // Start initial animation
        animate(gameState);

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
            window.cancelAnimationFrame(animationIdRef.current);
            window.removeEventListener("resize", handleResize);
        };
    }, [handleKeyDown, handleKeyUp]);

    useEffect(() => {
        if (imagesLoaded && minLoadingComplete) {
            setFadeOut(true);
            // Wait for fadeout animation to complete before removing loader
            setTimeout(() => {
                setLoading(false);
            }, 200); // Match this with CSS transition duration
        }
    }, [imagesLoaded, minLoadingComplete]);


    useEffect(() => {
        const checkMenuKey = () => {
            if (keys.current.c.pressed) {
                keys.current.c.pressed = false; // Reset to prevent multiple toggles
                setShowControls(true);
            }
            requestAnimationFrame(checkMenuKey);
        };
        const animationId = requestAnimationFrame(checkMenuKey);
        return () => cancelAnimationFrame(animationId);
    }, [keys]);

    useEffect(() => {
        const handleInitialKeyPress = (e) => {
            setShowControls(false);
            // Remove the event listener after first key press
            window.removeEventListener('keydown', handleInitialKeyPress);
        };

        window.addEventListener('keydown', handleInitialKeyPress);
        return () => window.removeEventListener('keydown', handleInitialKeyPress);
    }, []);

    return (
        <>
            {loading && <Loader fadeOut={fadeOut} />}
            <canvas ref={canvasRef} />
            {xButton && <XBtn position={playerPosition} />}
            {!loading && <Navbar />}
            {!loading && showControls && <Controls onClose={() => setShowControls(false)} />}
        </>
    );
}

export default Canvas;
