import React from 'react';
import images from '~/assets/images';

const UserButton = ({ user, onClick }) => {
    return (
        <button
            type="button"
            className="flex text-sm rounded-full md:mr-0 items-center"
            id="user-menu-button"
            aria-expanded="false"
            onClick={onClick}
        >
            <img
                className="w-8 h-8 md:mr-3 rounded-full border"
                src={(user.avatar) ? user.avatar : images.user}
                alt="user photo"
            />
            <span className="hidden xl:block">
                Chào {user.role === 'Teacher' ? 'Thầy/Cô' : 'bạn'}! <br />
                {user.name}
            </span>
        </button>
    );
};

export default UserButton;
