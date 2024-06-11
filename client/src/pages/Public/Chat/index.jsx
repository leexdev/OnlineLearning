import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '~/context/AuthContext';
import SignalRService from '~/service/signalrService';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import userApi from '~/api/userApi';

const Chat = () => {
    const [selectedContact, setSelectedContact] = useState(null);
    const [contacts, setContacts] = useState([]);
    const { user, loading } = useContext(AuthContext);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const data = await userApi.contact();
                setContacts(data);
                console.log('Contacts fetched: ', data);
            } catch (error) {
                console.error('Error fetching contacts: ', error);
            }
        };

        fetchContacts();

        if (user) {
            const userToken = user.token;
            SignalRService.startConnection(userToken);
            console.log('SignalR connection started with user token');

            SignalRService.addReceiveMessageListener((message) => {
                setContacts((prevContacts) => {
                    return prevContacts.map((contact) => {
                        if (contact.id === message.senderId) {
                            return {
                                ...contact,
                                lastMessage: message.content,
                                lastMessageTime: message.timestamp,
                                lastMessageIsRead: false,
                            };
                        }
                        return contact;
                    });
                });

                // Nếu người gửi tin nhắn là người dùng hiện tại đang được chọn, cập nhật `selectedContact`
                if (selectedContact && selectedContact.id === message.senderId) {
                    setSelectedContact((prevSelected) => ({
                        ...prevSelected,
                        messages: [...prevSelected.messages, message],
                    }));
                }
            });
        }

        return () => {
            SignalRService.receiveMessageListeners.forEach((listener) => {
                SignalRService.removeReceiveMessageListener(listener);
            });
        };
    }, [user, selectedContact]);

    const handleSelectContact = async (contact) => {
        setSelectedContact(contact);
        console.log('Contact selected: ', contact);
        try {
            const conversation = await SignalRService.getConversationWithContact(contact.id);
            console.log('Fetched conversation: ', conversation);

            if (conversation) {
                const history = await SignalRService.getChatHistory(conversation.id);
                console.log('Chat history: ', history);
                setSelectedContact({ ...contact, conversationId: conversation.id, messages: history });

                for (const message of history) {
                    if (!message.isRead) {
                        await SignalRService.markMessageAsRead(message.id);
                        console.log('đã xem');
                    }
                }
            } else {
                const newConversation = await SignalRService.createConversation(contact.id);
                console.log('New conversation created: ', newConversation);
                setSelectedContact({ ...contact, conversationId: newConversation.id, messages: [] });
            }

            await SignalRService.joinConversation(conversation ? conversation.id : newConversation.id);
        } catch (error) {
            console.error('Error handling contact selection: ', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex h-[calc(100vh-56px)]">
            <Sidebar contacts={contacts} onSelectContact={handleSelectContact} />
            {selectedContact && <ChatArea selectedContact={selectedContact} currentUserEmail={user.email} />}
        </div>
    );
};

export default Chat;
