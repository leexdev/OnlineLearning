import axiosClient from './axiosClient';

const chatApi = {
    getConversationWithContact: async (contactId) => {
        try {
            const response = await axiosClient.get(`/Chat/conversation/contact/${contactId}`);
            return response;
        } catch (error) {
            console.error('Error fetching conversation: ', error);
            return null;
        }
    },

    createConversation: async (contactId) => {
        try {
            const response = await axiosClient.post(`/Chat/conversation/${contactId}`);
            return response;
        } catch (error) {
            console.error('Error creating conversation: ', error);
            return null;
        }
    },
    getChatHistory: async (conversationId, page = 1, pageSize = 15) => {
        try {
            const response = await axiosClient.get(`/Chat/conversation/${conversationId}/messages`, {
                params: { page, pageSize },
            });
            return response;
        } catch (error) {
            console.error('Error fetching chat history: ', error);
            return [];
        }
    },

    markMessageAsRead: async (messageId) => {
        try {
            const response = await axiosClient.post(`/Chat/messages/${messageId}/read`);
            return response;
        } catch (error) {
            console.error('Error marking message as read: ', error);
            return null;
        }
    },
};

export default chatApi;
