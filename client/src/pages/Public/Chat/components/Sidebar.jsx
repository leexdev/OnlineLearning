import React, { useState } from 'react';
import images from '~/assets/images';

const Sidebar = ({ contacts, onSelectContact }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Sắp xếp danh sách liên hệ theo tin nhắn mới nhất
  const sortedContacts = [...contacts].sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime));

  console.log('contact', sortedContacts);
  return (
    <div className={`w-full md:w-1/4 bg-white border-r border-gray-300 ${menuOpen ? 'block' : 'hidden'} md:block`}>
      <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
        <h1 className="text-2xl font-semibold">Nhắn tin</h1>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-100" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path d="M2 10a2 2 0 012-2h12a2 2 0 012 2 2 2 0 01-2 2H4a2 2 0 01-2-2z" />
            </svg>
          </button>
        </div>
      </header>

      <div className="overflow-y-auto h-full p-3">
        {sortedContacts.map(contact => (
          <div key={contact.id} className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md" onClick={() => onSelectContact(contact)}>
            <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
              <img src={contact.avatar ? contact.avatar : images.user} alt="User Avatar" className="w-12 h-12 rounded-full" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{contact.name}</h2>
              <p className="text-gray-600">{contact.lastMessage}</p>
              <p className="text-xs text-gray-400">{contact.lastMessageTime && new Date(contact.lastMessageTime).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
