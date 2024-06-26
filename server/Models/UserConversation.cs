using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    [Table("UserConversations")]
    public class UserConversation : BaseModel
    {
        public int Id { get; set; }
        public string? UserId { get; set; }
        public User? User { get; set; }
        public int ConversationId { get; set; }
        public Conversation? Conversation { get; set; }
    }
}