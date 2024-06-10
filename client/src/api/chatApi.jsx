import axiosClient from './axiosClient';

const chatApi = {
    getChatHistory: async (conversationId) => {
        try {
            const response = await axiosClient.get(`/Chat/conversation/${conversationId}/messages`);
            return response;
        } catch (error) {
            console.error('Error fetching chat history: ', error);
            return [];
        }
    },

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
};

export default chatApi;
