import React from 'react';
import images from '~/assets/images';
import { format } from 'date-fns';

const Sidebar = ({ contacts, onSelectContact, selectedContact }) => {
    const sortedContacts = [...contacts].sort((a, b) => {
        if (!a.lastMessageIsRead && b.lastMessageIsRead) return -1;
        if (a.lastMessageIsRead && !b.lastMessageIsRead) return 1;
        return new Date(b.lastMessageTime) - new Date(a.lastMessageTime);
    });

    return (
        <div className="w-full bg-white border-gray-300 mt-4">
            <header className="p-4 border-b border-gray-300 bg-indigo-600 text-white">
                <h1 className="text-2xl font-semibold">Danh sách liên hệ</h1>
            </header>

            <div className="overflow-y-auto max-h-64 p-3 border">
                {sortedContacts.map((contact) => (
                    <div
                        key={contact.id}
                        className={`flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md ${
                            selectedContact && selectedContact.id === contact.id ? 'bg-gray-200 font-bold' : ''
                        }`}
                        onClick={() => onSelectContact(contact)}
                    >
                        <div className="w-12 h-12 bg-gray-300 rounded-full mr-3 relative">
                            <img
                                src={contact.avatar ? contact.avatar : images.user}
                                alt="User Avatar"
                                className="w-12 h-12 rounded-full"
                            />
                            {!contact.lastMessageIsRead && (
                                <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full"></span>
                            )}
                        </div>
                        <div className="flex-1">
                            <h2 className="text-lg font-semibold">{contact.name}</h2>
                            <p
                                className={`text-gray-600 ${
                                    !contact.lastMessageIsRead ? 'font-bold text-green-600' : ''
                                }`}
                            >
                                {contact.lastMessage}
                            </p>
                            <p className="text-xs text-gray-400">
                                {contact.lastMessageTime &&
                                    format(new Date(contact.lastMessageTime), 'dd/MM/yyyy HH:mm')}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
