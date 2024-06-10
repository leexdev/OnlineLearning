using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Interfaces;
using server.Models;

namespace server.Repository
{
    public class ConversationRepository : IConversationRepository
    {
        private readonly ApplicationDbContext _context;

        public ConversationRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Conversation> GetConversationWithContactAsync(string userId, string contactId)
        {
            return await _context.Conversations
                .Include(c => c.ChatMessages)
                .Include(c => c.UserConversations)
                .FirstOrDefaultAsync(c =>
                    c.UserConversations.Any(uc => uc.UserId == userId) &&
                    c.UserConversations.Any(uc => uc.UserId == contactId));
        }

        public async Task<Conversation> CreateConversationAsync(string userId, string contactId)
        {
            var conversation = new Conversation();
            conversation.UserConversations.Add(new UserConversation { UserId = userId });
            conversation.UserConversations.Add(new UserConversation { UserId = contactId });

            _context.Conversations.Add(conversation);
            await _context.SaveChangesAsync();

            return conversation;
        }
    }
}