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
    });
    const animationIdRef = useRef();

    const cleanupAndNavigate = useCallback(() => {
        if (animationIdRef.current) {
            window.cancelAnimationFrame(animationIdRef.current);
        }
        navigate("/");
    }, [navigate]);

    const handleKeyDown = useCallback((e) => {
        const key = e.key.toLowerCase();
        if (keys.current[key] !== undefined) {
            keys.current[key].pressed = true;
            if (key !== "x") {
                lastKey.current = key;
            }
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

    return {
        keys,
        lastKey,
        handleKeyDown,
        handleKeyUp,
        animationIdRef
    };
};
