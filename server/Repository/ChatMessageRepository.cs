using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Interfaces;
using server.Models;

public class ChatMessageRepository : IChatMessageRepository
{
    private readonly ApplicationDbContext _context;

    public ChatMessageRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<ChatMessage>> GetMessagesByConversationIdAsync(int conversationId, int page, int pageSize)
    {
        var chatMessages = await _context.ChatMessages
            .Where(m => m.ConversationId == conversationId)
            .OrderByDescending(m => m.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Include(m => m.User)
            .ToListAsync();

        return chatMessages;
    }

    public async Task AddMessageAsync(ChatMessage chatMessage)
    {
        _context.ChatMessages.Add(chatMessage);
        await _context.SaveChangesAsync();
    }

    public async Task<ChatMessage> GetLastMessageByConversationIdAsync(int conversationId)
    {
        return await _context.ChatMessages
            .Include(c => c.Conversation).ThenInclude(c => c.UserConversations)
            .Where(m => m.ConversationId == conversationId)
            .OrderByDescending(m => m.CreatedAt)
            .FirstOrDefaultAsync();
    }

    public async Task<ChatMessage> GetMessageByIdAsync(int messageId)
    {
        return await _context.ChatMessages
            .Include(m => m.Conversation)
            .ThenInclude(c => c.UserConversations)
            .FirstOrDefaultAsync(m => m.Id == messageId);
    }

    public async Task UpdateMessageAsync(ChatMessage message)
    {
        _context.ChatMessages.Update(message);
        await _context.SaveChangesAsync();
    }

}
