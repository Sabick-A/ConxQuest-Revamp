import { useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const useKeyboard = () => {
    const navigate = useNavigate();
    const lastKey = useRef("");
    const keys = useRef({
        w: { pressed: false },
        a: { pressed: false },
        s: { pressed: false },
        d: { pressed: false },
        x: { pressed: false },
        h: { pressed: false },
        c: { pressed: false },
        tab: { pressed: false },
        g: {pressed:false}
    });
    const animationIdRef = useRef();

    const cleanupAndNavigate = useCallback((onNavigate) => {
        if (animationIdRef.current) {
            window.cancelAnimationFrame(animationIdRef.current);
        }
        if (onNavigate) {
            onNavigate(() => {
            
                setTimeout(() => {
                    navigate("/");
                }, 800); 
            });
        } else {
            navigate("/");
        }
    }, [navigate]);

    const handleKeyDown = useCallback((e, onNavigate) => {
        e.preventDefault();
        const key = e.key.toLowerCase();
        switch (key) {
            case "w":
            case "a":
            case "s":
            case "d":
            case "x":
            case "c":
            case "tab":
            case "g":
                keys.current[key].pressed = true;
                if (key !== "x" && key !== "escape") {
                    lastKey.current = key;
                }
                break;
            case "h":
                cleanupAndNavigate(onNavigate);
                break;
        }
    }, [cleanupAndNavigate]);

    const handleKeyUp = useCallback((e) => {
        const key = e.key.toLowerCase();
        switch (key) {
            case "w":
            case "a":
            case "s":
            case "d":
            case "x":
            case "h":
            case "c":
            case "tab":
            case "g":
                keys.current[key].pressed = false;
                break;
        }
    }, []);

    return {
        keys,
        lastKey,
        handleKeyDown,
        handleKeyUp,
        animationIdRef
    };
};
