using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Models;

namespace server.Interfaces
{
    public interface IConversationRepository
    {
        Task<Conversation> GetConversationWithContactAsync(string userId, string contactId);
        Task<Conversation> CreateConversationAsync(string userId, string contactId);
    }
}