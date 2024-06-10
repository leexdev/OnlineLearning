using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Dtos.Chat
{
    public class ChatMessageDto
    {
        public string? Email { get; set; }
        public string? Name { get; set; }
        public string? Message { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}