import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import images from '~/assets/images';
import NotLogin from './components/NotLogin';
import Navbar from './components/Navbar';
import LoginSuccess from './components/LoginSuccess';
import AuthContext from '~/context/AuthContext';

const Header = () => {
    const { user } = useContext(AuthContext);

    return (
        <nav className="bg-peach text-white fixed w-full z-[1000]">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto z-[1000]">
                <Link to="/" className="space-x-3 rtl:space-x-reverse md:opacity-70 md:hover:opacity-100">
                    <img src={images.logo} className="h-12 mb-3" alt="Logo" />
                </Link>
                <div className="flex items-center md:order-2 md:space-x-0 rtl:space-x-reverse">
                    {user ? <LoginSuccess user={user}/> : <NotLogin />}
                </div>
                <Navbar />
            </div>
        </nav>
    );
};

export default Header;
