import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import ListCourse from './components/ListCourse';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Course = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500); // Đợi 500ms sau khi người dùng ngừng nhập

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div>
            <Header />
            <div className="mb-4">
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <FontAwesomeIcon className="text-gray-400" icon={faSearch} />
                    </div>
                    <input
                        type="search"
                        id="default-search"
                        className="w-full p-3 ps-10 text-lg text-gray-900 border font-bold border-gray-200 rounded-lg bg-white focus:ring-cyan-500 focus:border-cyan-500"
                        placeholder="Tìm kiếm khóa học"
                        value={searchTerm}
                        onChange={handleSearch}
                        required
                    />
                </div>
            </div>
            <ListCourse searchTerm={debouncedSearchTerm} resetPageOnSearch />
        </div>
    );
};

export default Course;
