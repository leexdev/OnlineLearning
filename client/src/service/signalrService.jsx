import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import chatApi from '~/api/chatApi';

const getJwtToken = () => localStorage.getItem('jwtToken');

class SignalRService {
     constructor() {
        this.connection = null;
        this.receiveMessageListeners = [];
        this.isListenerAdded = false; // Chuyển biến trạng thái ra ngoài hàm
    }

    startConnection = async (userToken) => {
        if (!this.connection || this.connection.state !== 'Connected') {
            const token = userToken || getJwtToken();
            this.connection = new HubConnectionBuilder()
                .withUrl('https://localhost:5032/chatHub', {
                    accessTokenFactory: () => token,
                    withCredentials: true,
                })
                .configureLogging(LogLevel.Information)
                .build();

            this.connection.onclose(async () => {
                console.log('SignalR connection closed, attempting to reconnect...');
                await this.startConnection(userToken);
            });

            if (!this.isListenerAdded) { // Kiểm tra nếu sự kiện đã được đăng ký
                this.connection.on('ReceiveMessage', (user, message, email) => {
                    console.log('ReceiveMessage event triggered');
                    this.receiveMessageListeners.forEach((callback) => {
                        console.log('Executing callback with message:', message);
                        callback(user, message, email);
                    });
                });
                this.isListenerAdded = true; // Đánh dấu là sự kiện đã được đăng ký
            }

            try {
                await this.connection.start();
                console.log('SignalR connection established');
            } catch (error) {
                console.error('SignalR connection error:', error);
                setTimeout(() => this.startConnection(userToken), 5000);
            }
        }
    };

    addReceiveMessageListener = (callback) => {
        console.log('Adding receive message listener:', callback);
        if (!this.receiveMessageListeners.includes(callback)) {
            this.receiveMessageListeners.push(callback);
        }
    };

    removeReceiveMessageListener = (callback) => {
        console.log('Removing receive message listener:', callback);
        this.receiveMessageListeners = this.receiveMessageListeners.filter((listener) => listener !== callback);
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
            console.error('Error sending message:', error);
        }
    };

    joinConversation = async (conversationId) => {
        try {
            await this.connection.invoke('JoinConversation', conversationId);
            console.log(`Joined conversation ${conversationId}`);
        } catch (error) {
            console.error('Error joining conversation:', error);
        }
    };

    leaveConversation = async (conversationId) => {
        try {
            await this.connection.invoke('LeaveConversation', conversationId);
            console.log(`Left conversation ${conversationId}`);
        } catch (error) {
            console.error('Error leaving conversation:', error);
        }
    };

    getChatHistory = chatApi.getChatHistory;
    getConversationWithContact = chatApi.getConversationWithContact;
    createConversation = chatApi.createConversation;
    markMessageAsRead = chatApi.markMessageAsRead;
}

export default new SignalRService();
