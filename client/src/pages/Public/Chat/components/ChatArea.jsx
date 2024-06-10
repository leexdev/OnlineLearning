import React, { useEffect, useState } from 'react';
import SignalRService from '~/service/signalrService';

const ChatArea = ({ selectedContact, currentUserEmail }) => {
    const [messages, setMessages] = useState(selectedContact.messages || []);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        const handleMessageReceive = (user, message, email) => {
            console.log(`Received message from ${user}: ${message}`);
            setMessages((prevMessages) => [
                ...prevMessages,
                { name: user, message: message, email: email, createdAt: new Date() },
            ]);
        };

        SignalRService.addReceiveMessageListener(handleMessageReceive);
        console.log('Listener registered for receiving messages.');

        return () => {
            SignalRService.removeReceiveMessageListener(handleMessageReceive);
            console.log('Listener unregistered.');
        };
    }, []);

    useEffect(() => {
        if (selectedContact?.messages) {
            setMessages(selectedContact.messages);
        } else {
            setMessages([]); // Reset messages nếu không có dữ liệu
        }
    }, [selectedContact?.messages]);

    useEffect(() => {
        setMessages(selectedContact.messages || []);
    }, [selectedContact]);

    const handleSendMessage = async () => {
        if (!newMessage.trim()) {
            console.error('Message is empty');
            return;
        }

        try {
            console.log('Sending message:', newMessage);
            await SignalRService.sendMessage(newMessage, selectedContact.conversationId);
            setMessages((prevMessages) => [
                ...prevMessages,
                { name: 'Me', message: newMessage, email: currentUserEmail, createdAt: new Date() },
            ]);
            setNewMessage('');
        } catch (error) {
            console.error('Error sending message: ', error);
        }
    };

    return (
        <div className="flex-1 flex flex-col">
            <header className="bg-white p-4 text-gray-700">
                <h1 className="text-2xl font-semibold">{selectedContact.name}</h1>
            </header>

            <div className="flex-1 overflow-y-auto p-4">
                {messages.map((message, index) => (
                    <div key={index} className={`flex mb-4 ${message.email === currentUserEmail ? 'justify-end' : ''}`}>
                        {message.email !== currentUserEmail && (
                            <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                                <img src={selectedContact.avatar} alt="User Avatar" className="w-8 h-8 rounded-full" />
                            </div>
                        )}
                        <div
                            className={`flex max-w-96 ${
                                message.email === currentUserEmail
                                    ? 'bg-indigo-500 text-white'
                                    : 'bg-white text-gray-700'
                            } rounded-lg p-3 gap-3`}
                        >
                            <p>{message.message}</p>
                        </div>
                        {message.email === currentUserEmail && (
                            <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                                <img
                                    src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                                    alt="My Avatar"
                                    className="w-8 h-8 rounded-full"
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <footer className="bg-white border-t border-gray-300 p-4">
                <div className="flex items-center">
                    <input
                        type="text"
                        placeholder="Nhập tin nhắn..."
                        className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-peach focus:ring-peach"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button onClick={handleSendMessage} className="bg-peach text-white px-4 py-2 rounded-md ml-2">
                        Gửi
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default ChatArea;
