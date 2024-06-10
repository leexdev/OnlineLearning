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
            } catch (error) {
                console.error('Error fetching contacts: ', error);
            }
        };

        fetchContacts();

        if (user) {
            SignalRService.startConnection();
        }
    }, [user]);

    const handleSelectContact = async (contact) => {
        setSelectedContact(contact);
        console.log(contact);
        try {
            const conversation = await SignalRService.getConversationWithContact(contact.id);
            if (conversation) {
                const history = await SignalRService.getChatHistory(conversation.id);
                console.log(history);
                setSelectedContact({ ...contact, conversationId: conversation.id, messages: history });
            } else {
                const newConversation = await SignalRService.createConversation(contact.id);
                setSelectedContact({ ...contact, conversationId: newConversation.id, messages: [] });
            }
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
