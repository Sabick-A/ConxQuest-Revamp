import React, { useEffect, useRef, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    initSprites,
    initiVectors,
    updateGameLogic,
    checkXButtonStatus,
} from "../utils/Map";
import Loader from "../components/Map/Loader/Loader";
import XBtn from "../components/Map/XBtn";
import StartInfo from "../components/Map/StartInfo";
import Navbar from "../components/Map/Navbar";

function Canvas() {
    const [loading, setLoading] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);
    const [xButton, setXButton] = useState(false);
    const [showStartInfo,setShowStartInfo]=useState(true);
    const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [minLoadingComplete, setMinLoadingComplete] = useState(false);
    const navigate = useNavigate();
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const lastKey = useRef("");
    const keys = useRef({
        w: { pressed: false },
        a: { pressed: false },
        s: { pressed: false },
        d: { pressed: false },
        x: { pressed: false },
    });
    const animationIdRef = useRef();

    const cleanupAndNavigate = useCallback(() => {
        // Cancel the animation frame immediately
        if (animationIdRef.current) {
            window.cancelAnimationFrame(animationIdRef.current);
        }
        // Navigate after cleanup
        navigate("/");
    }, [navigate]);

    const handleKeyDown = useCallback((e) => {
        const key = e.key.toLowerCase();
        if (keys.current[key] !== undefined) {
            keys.current[key].pressed = true;
            if (key !== "x") lastKey.current = key;
        }
        if(key === "h") {
            cleanupAndNavigate();
        }
    }, [cleanupAndNavigate]);

    const handleKeyUp = useCallback((e) => {
        const key = e.key.toLowerCase();
        if (keys.current[key] !== undefined) {
            keys.current[key].pressed = false;
        }
    }, []);

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

        // Track image loading
        const imagesToLoad = [background.image, player.image, foreground.image];
        let loadedImages = 0;

        const handleImageLoad = () => {
            loadedImages++;
            if (loadedImages === imagesToLoad.length) {
                setImagesLoaded(true);
            }
        };

        // Add load event listeners to all images
        imagesToLoad.forEach(img => {
            if (img.complete) {
                handleImageLoad();
            } else {
                img.addEventListener('load', handleImageLoad);
            }
            // Clean up image load listeners
            img.addEventListener('load', () => {
                img.removeEventListener('load', handleImageLoad);
            }, { once: true });
        });

        // Add event listeners
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        
        window.botpress?.on('webchat:closed', () => {
            requestAnimationFrame(animate);
        });

        const movables = [
            background,
            ...boundaries,
            foreground,
            ...teleports,
            ...interacts,
        ];

        const animate = () => {
            contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
            const teleportActivated = updateGameLogic(
                contextRef.current,
                player,
                background,
                foreground,
                boundaries,
                teleports,
                interacts,
                keys.current,
                lastKey.current,
                movables
            );
            if (!teleportActivated) {
                animationIdRef.current = window.requestAnimationFrame(animate);
            }
            const xButtonActivated = checkXButtonStatus(
                player,
                teleports,
                interacts
            );
            setXButton(xButtonActivated);
            setPlayerPosition({
                x: player.position.x + player.width / 8, // Center horizontally (width/4/2)
                y: player.position.y + player.height / 2, // Center vertically
            });
        };

        animate();

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
        const handleKeyPress = () => {
            setShowStartInfo(false);
        };

        window.addEventListener("keydown", handleKeyPress);

        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, []);

    return (
        <>
            {loading && <Loader fadeOut={fadeOut} />}
            {!loading && showStartInfo && <StartInfo/>}
            {!loading && <Navbar/>}
            <canvas ref={canvasRef}></canvas>
            {xButton && <XBtn position={playerPosition} />}

        </>
    );
}

export default Canvas;
