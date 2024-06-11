using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Dtos.Chat;
using server.Models;
using server.Repository;

namespace server.Mappers
{
    public static class ChatMessageMappers
    {
        public static ChatMessageDto ToChatMessageDto(this ChatMessage chatMessage)
        {
            return new ChatMessageDto
            {
                Id = chatMessage.Id,
                Name = chatMessage.User.Name,
                Email = chatMessage.User.Email,
                Message = chatMessage.Message,
                CreatedAt = chatMessage.CreatedAt
            };
        }
    }
}