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

    public async Task<List<ChatMessage>> GetMessagesByConversationIdAsync(int conversationId)
    {
        var chatMessages = await _context.ChatMessages
            .Where(m => m.ConversationId == conversationId)
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
            .Where(m => m.ConversationId == conversationId)
            .OrderByDescending(m => m.CreatedAt)
            .FirstOrDefaultAsync();
    }
}
