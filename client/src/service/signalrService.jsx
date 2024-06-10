import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import chatApi from '~/api/chatApi';

const getJwtToken = () => {
    return localStorage.getItem('jwtToken');
};

class SignalRService {
    constructor() {
        this.connection = null;
        this.receiveMessageListeners = [];
    }

    startConnection = async () => {
        if (!this.connection) {
            const token = getJwtToken();
            this.connection = new HubConnectionBuilder()
                .withUrl('https://localhost:5032/chatHub', {
                    accessTokenFactory: () => token,
                    withCredentials: true,
                })
                .configureLogging(LogLevel.Information)
                .build();

            this.connection.onclose(async () => {
                await this.startConnection();
            });

            try {
                await this.connection.start();
                console.log('SignalR connection established');
            } catch (error) {
                console.error('SignalR connection error: ', error);
                setTimeout(this.startConnection, 5000); // Thử kết nối lại sau 5 giây
            }
        }
    };

    addReceiveMessageListener = (callback) => {
        if (this.connection) {
            this.connection.on('ReceiveMessage', callback);
            console.log('Callback registered:', callback);
            this.receiveMessageListeners.push(callback);
        } else {
            console.log('Connection not established yet.');
        }
    };

    removeReceiveMessageListener = (callback) => {
        if (this.connection) {
            this.connection.off('ReceiveMessage', callback);
            this.receiveMessageListeners = this.receiveMessageListeners.filter((listener) => listener !== callback);
        }
    };

    sendMessage = async (message, conversationId) => {
        try {
            if (this.connection.state !== 'Connected') {
                console.error('SignalR connection is not in the Connected state');
                await this.connection.start();
            }
            await this.connection.send('SendMessage', message, conversationId);
            console.log(`Message sent to conversation ${conversationId}`);
        } catch (error) {
            console.error('Error sending message: ', error);
        }
    };

    joinConversation = async (conversationId) => {
        try {
            await this.connection.invoke('JoinConversation', conversationId);
            console.log(`Joined conversation ${conversationId}`);
        } catch (error) {
            console.error('Error joining conversation: ', error);
        }
    };

    leaveConversation = async (conversationId) => {
        try {
            await this.connection.invoke('LeaveConversation', conversationId);
            console.log(`Left conversation ${conversationId}`);
        } catch (error) {
            console.error('Error leaving conversation: ', error);
        }
    };

    getChatHistory = chatApi.getChatHistory;

    getConversationWithContact = chatApi.getConversationWithContact;

    createConversation = chatApi.createConversation;
}

export default new SignalRService();
