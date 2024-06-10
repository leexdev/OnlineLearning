import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset > 100) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            className={`fixed bottom-2 right-4 bg-white px-4 py-2 z-[1000] opacity-70 rounded-full shadow-lg ${showButton ? 'block' : 'hidden'}`}
            onClick={scrollToTop}
        >
            <FontAwesomeIcon icon={faArrowUp}/>
        </button>
    );
};

export default ScrollToTopButton;
