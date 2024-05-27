import React from 'react';

const UserButton = ({ onClick }) => {
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
                src="/docs/images/people/profile-picture-3.jpg"
                alt="user photo"
            />
            <span className="hidden xl:block">
                Chào em! <br />
                Nguyễn Văn A
            </span>
        </button>
    );
};

export default UserButton;
