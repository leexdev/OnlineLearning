// src/components/MobileMenuButton.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const MobileMenuButton = () => {
    return (
        <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-gray-100 focus:bg-peach"
            aria-controls="navbar-user"
            aria-expanded="false"
        >
            <FontAwesomeIcon icon={faBars} />
        </button>
    );
};

export default MobileMenuButton;
