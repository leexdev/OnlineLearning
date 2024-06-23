import React, { useContext, useState, useRef, useEffect } from 'react';
import UserButton from './UserButton';
import UserDropdown from './UserDropdown';
import TeacherDropdown from './TeacherDropdown';
import AdminDropdown from './AdminDropdown';
import MobileMenuButton from './MobileMenuButton';
import AuthContext from '~/context/AuthContext';

const LoginSuccess = ({ user }) => {
    const { logout } = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className="relative flex md:block" ref={dropdownRef}>
            <UserButton user={user} onClick={toggleDropdown} />
            {dropdownOpen && (
                <>
                    {user.role === 'Admin' ? (
                        <AdminDropdown user={user} onLogout={logout} />
                    ) : user.role === 'Teacher' ? (
                        <TeacherDropdown user={user} onLogout={logout} />
                    ) : (
                        <UserDropdown user={user} onLogout={logout} />
                    )}
                </>
            )}
            <MobileMenuButton />
        </div>
    );
};

export default LoginSuccess;
