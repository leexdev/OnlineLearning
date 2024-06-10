using System.Threading.Tasks;
using server.Models;

public interface IChatMessageRepository
{
    Task AddMessageAsync(ChatMessage message);
    Task<List<ChatMessage>> GetMessagesByConversationIdAsync(int conversationId);
    Task<ChatMessage> GetLastMessageByConversationIdAsync(int conversationId);
}
