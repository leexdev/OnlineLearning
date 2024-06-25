import React, { useEffect, useState, useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import images from '~/assets/images';
import SignalRService from '~/service/signalrService';
import { format } from 'date-fns';

const ChatArea = ({ selectedContact, currentUserEmail }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const scrollableDivRef = useRef(null);
    const isListenerAdded = useRef(false);

    const fetchMoreMessages = async () => {
        try {
            const nextPage = page + 1;
            const response = await SignalRService.getChatHistory(selectedContact.conversationId, nextPage);

            if (response.length < 15) setHasMore(false);

            const newMessages = response.filter(
                (msg) => !messages.some((existingMsg) => existingMsg.createdAt === msg.createdAt),
            );

            console.log('newMessages', newMessages);

            const previousScrollHeight = scrollableDivRef.current.scrollHeight;
            const previousScrollTop = scrollableDivRef.current.scrollTop;

            const sortedMessages = [...newMessages, ...messages].sort(
                (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
            );
            setMessages(sortedMessages);
            setPage(nextPage);

            const newScrollHeight = scrollableDivRef.current.scrollHeight;
            const newScrollTop = previousScrollTop + (newScrollHeight - previousScrollHeight);

            setTimeout(() => {
                scrollableDivRef.current.scrollTop = newScrollTop;
            }, 0);
        } catch (error) {
            console.error('Error fetching more messages: ', error);
        }
    };

    const handleMessageReceive = (user, message, email) => {
        console.log('Message received:', message);
        setMessages((prevMessages) => {
            if (prevMessages.some((msg) => msg.createdAt === message.createdAt)) {
                return prevMessages;
            }
            const newMessages = [...prevMessages, { user, message, email, createdAt: new Date() }];
            return newMessages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        });
    };

    useEffect(() => {
        if (!isListenerAdded.current) {
            SignalRService.addReceiveMessageListener(handleMessageReceive);
            isListenerAdded.current = true;
        }

        return () => {
            if (isListenerAdded.current) {
                SignalRService.removeReceiveMessageListener(handleMessageReceive);
                isListenerAdded.current = false;
            }
        };
    }, []);

    useEffect(() => {
        const sortedMessages = (selectedContact.messages || []).sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
        );
        setMessages(sortedMessages);
        setPage(1);
        setHasMore(true);
    }, [selectedContact]);

    useEffect(() => {
        scrollableDivRef.current.scrollTop = scrollableDivRef.current.scrollHeight;
    }, [selectedContact]);

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;
        try {
            console.log('newMessage', newMessage);
            console.log('selectedContact.conversationId', selectedContact.conversationId);
            await SignalRService.sendMessage(newMessage, selectedContact.conversationId);

            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSendMessage();
    };

    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            <header className="bg-white p-4 text-gray-700 border-b-2">
                <h1 className="text-2xl font-semibold">{selectedContact.name}</h1>
            </header>

            <div
                className="flex-1 overflow-y-auto p-4 bg-white"
                id="scrollableDiv"
                ref={scrollableDivRef}
                style={{ display: 'flex', flexDirection: 'column-reverse', height: '400px' }}
            >
                <InfiniteScroll
                    dataLength={messages.length}
                    next={fetchMoreMessages}
                    hasMore={hasMore}
                    inverse={true}
                    scrollableTarget="scrollableDiv"
                >
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex mb-4 ${message.email === currentUserEmail ? 'justify-end' : ''}`}
                        >
                            {message.email !== currentUserEmail && (
                                <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                                    <img
                                        src={selectedContact.avatar ? selectedContact.avatar : images.user}
                                        alt="User Avatar"
                                        className="w-8 h-8 rounded-full"
                                    />
                                </div>
                            )}
                            <div
                                className={`max-w-xs md:max-w-md break-words p-2 rounded-lg ${
                                    message.email === currentUserEmail
                                        ? 'bg-teal-400 text-white'
                                        : 'bg-gray-200 text-gray-700'
                                }`}
                            >
                                <p className="text-lg">{message.message}</p>
                                <span
                                    className={`text-xs text-gray-500 ${
                                        message.email === currentUserEmail ? ' text-white' : ' text-gray-700'
                                    }`}
                                >
                                    {format(new Date(message.createdAt), 'dd/MM/yyyy HH:mm')}
                                </span>
                            </div>
                        </div>
                    ))}
                </InfiniteScroll>
            </div>

            <footer className="bg-white p-4 flex">
                <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Nhập tin nhắn..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <button onClick={handleSendMessage} className="bg-teal-500 text-white p-2 ml-2 rounded-md">
                    Gửi
                </button>
            </footer>
        </div>
    );
};

export default ChatArea;
