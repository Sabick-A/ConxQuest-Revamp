import { useEffect } from 'react';

export const useScrollAnimation = () => {
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const handleIntersect = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersect, observerOptions);

        // Observe all elements with the animate-on-scroll class
        document.querySelectorAll('.animate-on-scroll').forEach(element => {
            observer.observe(element);
        });

        return () => {
            observer.disconnect();
        };
    }, []);
};
