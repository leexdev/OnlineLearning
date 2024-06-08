import React from 'react';

const MessageModal = ({ title, image, message, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-75">
            <div className="bg-white rounded-lg p-6 shadow-lg min-w-[300px] max-w-[500px] text-center">
                <h2 className="text-xl font-bold mb-4 text-red-500">{title}</h2>
                <div className="flex justify-center my-3">
                    <img src={image} className='w-52 h-52' alt="modal" />
                </div>
                <p>{message}</p>
                <button onClick={onClose} className="mt-4 px-4 py-2 bg-peach text-white rounded">
                    Đóng
                </button>
            </div>
        </div>
    );
};

export default MessageModal;
