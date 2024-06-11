using System.Threading.Tasks;
using server.Models;

public interface IChatMessageRepository
{
    Task AddMessageAsync(ChatMessage message);
    Task<List<ChatMessage>> GetMessagesByConversationIdAsync(int conversationId, int page, int pageSize);
    Task<ChatMessage> GetLastMessageByConversationIdAsync(int conversationId);
    Task<ChatMessage> GetMessageByIdAsync(int messageId);
    Task UpdateMessageAsync(ChatMessage message);
}
