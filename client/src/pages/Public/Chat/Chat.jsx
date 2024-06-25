import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '~/context/AuthContext';
import SignalRService from '~/service/signalrService';
import SidebarUser from '~/components/Common/SidebarUser';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import chatApi from '~/api/chatApi';

const Chat = () => {
    const [selectedContact, setSelectedContact] = useState(null);
    const [contacts, setContacts] = useState([]);
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const { user, loading } = useContext(AuthContext);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                let data;
                if (user.role === 'User') {
                    data = await chatApi.getTeachersForStudentCourses();
                } else if (user.role === 'Teacher') {
                    data = await chatApi.GetStudentsForTeacher();
                }
                setContacts(data);
                console.log('Contacts fetched: ', data);
            } catch (error) {
                console.error('Error fetching contacts: ', error);
            }
        };

        fetchContacts();

        if (user) {
            const userToken = user.token;
            SignalRService.startConnection(userToken)
                .then(() => {
                    console.log('SignalR connection started with user token');
                })
                .catch((error) => console.error('SignalR connection error:', error));
        }
    }, [user]);

    useEffect(() => {
        const handleReceiveMessage = (user2, message, email) => {
            setContacts((prevContacts) => {
                return prevContacts.map((contact) => {
                    if (contact.id === user2.id) {
                        return {
                            ...contact,
                            lastMessage: message,
                            lastMessageTime: new Date(),
                            lastMessageIsRead: email !== user.email,
                        };
                    }
                    return contact;
                });
            });

            if (selectedContact && selectedContact.id === user2.id) {
                setSelectedContact((prevSelected) => ({
                    ...prevSelected,
                    messages: [...prevSelected.messages, { user: user2, message, email, createdAt: new Date() }],
                }));
            }
        };

        SignalRService.addReceiveMessageListener(handleReceiveMessage);

        return () => {
            SignalRService.removeReceiveMessageListener(handleReceiveMessage);
        };
    }, [selectedContact, user.email]);

    const handleSelectContact = async (contact) => {
        setSelectedContact(contact);
        try {
            const conversation = await chatApi.getConversationWithContact(contact.id);
            console.log('Fetched conversation: ', conversation);

            if (conversation) {
                const history = await chatApi.getChatHistory(conversation.id);
                console.log('Chat history: ', history);
                setSelectedContact({ ...contact, conversationId: conversation.id, messages: history });

                for (const message of history) {
                    if (!message.isRead) {
                        await chatApi.markMessageAsRead(message.id);
                        console.log('Message marked as read');
                    }
                }

                await SignalRService.joinConversation(conversation.id);
            } else {
                const newConversation = await chatApi.createConversation(contact.id);
                console.log('New conversation created: ', newConversation);
                setSelectedContact({ ...contact, conversationId: newConversation.id, messages: [] });

                await SignalRService.joinConversation(newConversation.id);
            }
        } catch (error) {
            console.error('Error handling contact selection: ', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    return (
        <div className="container mx-auto p-4 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <SidebarUser user={user} />
                    <button
                        onClick={toggleSidebar}
                        className="mt-4 bg-indigo-600 text-white p-2 rounded-md w-full md:hidden"
                    >
                        {sidebarVisible ? 'Ẩn Liên Hệ' : 'Hiện Liên Hệ'}
                    </button>
                    {sidebarVisible && (
                        <Sidebar
                            contacts={contacts}
                            onSelectContact={handleSelectContact}
                            selectedContact={selectedContact}
                        />
                    )}
                </div>
                <div className="lg:col-span-2">
                    <div className="flex flex-col rounded-md" style={{ height: 'calc(100vh - 202px)' }}>
                        {selectedContact ? (
                            <ChatArea selectedContact={selectedContact} currentUserEmail={user.email} />
                        ) : (
                            <div className="text-center text-gray-500">Chọn liên hệ để bắt đầu cuộc trò chuyện</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
