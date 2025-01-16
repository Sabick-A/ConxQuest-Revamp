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
import HomeBtn from '../components/Map/HomeBtn'
import StartInfo from "../components/Map/StartInfo";

function Canvas() {
    const [loading, setLoading] = useState(true);
    const [xButton, setXButton] = useState(false);
    const [showStartInfo,setShowStartInfo]=useState(true);
    const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
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

    // Unified event handler for both keydown and keyup
    const handleKey = useCallback((e, isPressed) => {
        const key = e.key.toLowerCase();
        if (keys.current[key] !== undefined) {
            keys.current[key].pressed = isPressed;
            if (isPressed && key !== "x") lastKey.current = key;
        }
        if(isPressed && key==="h"){
            navigate("/");
        }
    }, []);

    const handleKeyDown = useCallback((e) => handleKey(e, true), [handleKey]);
    const handleKeyUp = useCallback((e) => handleKey(e, false), [handleKey]);

    useEffect(() => {
        const canvas = canvasRef.current;
        contextRef.current = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const offset = {
            x: -900 + (canvas.width - 1024) / 2,
            y: -2800 + (canvas.height - 576) / 2,
        };

        const { teleports, boundaries, interacts } = initiVectors(offset);
        const { background, player, foreground } = initSprites(canvas, offset);

        // Add event listeners
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

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
        setTimeout(() => {
            setLoading(false);
        }, 4000);

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
            {loading && <Loader />}
            {!loading && showStartInfo && <StartInfo/>}
            {!loading && <HomeBtn/>}
            <canvas ref={canvasRef}></canvas>
            {xButton && <XBtn position={playerPosition} />}
        </>
    );
}

export default Canvas;
