import React from 'react';
import { Link } from 'react-router-dom';

const DropdownLink = ({ to, children, onClick }) => {
    return (
        <li>
            <Link to={to} onClick={onClick} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                {children}
            </Link>
        </li>
    );
};

export default DropdownLink;
