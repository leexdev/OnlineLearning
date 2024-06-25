import axiosClient from './axiosClient';

const chatApi = {
    async getConversationWithContact(contactId) {
        try {
            const response = await axiosClient.get(`/Chat/conversation/contact/${contactId}`);
            return response;
        } catch (error) {
            console.error('Error fetching conversation: ', error);
            return null;
        }
    },

    async createConversation(contactId) {
        try {
            const response = await axiosClient.post(`/Chat/conversation/${contactId}`);
            return response;
        } catch (error) {
            console.error('Error creating conversation: ', error);
            return null;
        }
    },

    async getChatHistory(conversationId, page = 1, pageSize = 15) {
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

    async markMessageAsRead(messageId) {
        try {
            const response = await axiosClient.post(`/Chat/messages/${messageId}/read`);
            return response;
        } catch (error) {
            console.error('Error marking message as read: ', error);
            return null;
        }
    },

    async getTeachersForStudentCourses() {
        const response = await axiosClient.get('/Chat/contacts/teachers-courses');
        return response;
    },

    async GetStudentsForTeacher() {
        const response = await axiosClient.get('/Chat/contacts/students');
        return response;
    },
};

export default chatApi;
