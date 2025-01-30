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
        Escape: { pressed: false },
        c: { pressed: false },
        tab: { pressed: false }
    });
    const animationIdRef = useRef();

    const cleanupAndNavigate = useCallback(() => {
        if (animationIdRef.current) {
            window.cancelAnimationFrame(animationIdRef.current);
        }
        navigate("/");
    }, [navigate]);

    const handleKeyDown = useCallback((e) => {
        e.preventDefault();
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
                keys.current[key].pressed = true;
                if (key !== "x" && key !== "escape") {
                    lastKey.current = key;
                }
                break;
            case "escape":
                cleanupAndNavigate();
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
