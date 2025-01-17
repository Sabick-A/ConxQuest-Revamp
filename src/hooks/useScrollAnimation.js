import { useEffect } from 'react';

export const useScrollAnimation = () => {
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px',
            threshold: 0.1
        };

        const handleIntersect = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                } else {
                    entry.target.classList.remove('animate-in');
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersect, observerOptions);

        setTimeout(() => {
            document.querySelectorAll('.animate-on-scroll').forEach(element => {
                element.classList.remove('animate-in');
                observer.observe(element);
            });
        }, 100);

        return () => {
            observer.disconnect();
        };
    }, []);
};
