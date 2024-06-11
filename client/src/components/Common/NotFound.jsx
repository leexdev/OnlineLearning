// src/pages/NotFound.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-red-500">404</h1>
                <p className="text-xl mt-4">Oops! Page not found.</p>
                <Link to="/" className="mt-6 inline-block bg-peach text-white px-4 py-2 rounded">
                    Về trang chủ
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
