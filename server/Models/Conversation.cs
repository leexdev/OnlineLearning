using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    [Table("Conversations")]
    public class Conversation : BaseModel
    {
        public int Id { get; set; }
        public List<ChatMessage> ChatMessages { get; set; } = new List<ChatMessage>();
        public List<UserConversation> UserConversations { get; set; } = new List<UserConversation>();
    }
}