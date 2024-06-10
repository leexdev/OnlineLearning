using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using server.Extensions;
using server.Interfaces;
using server.Models;

namespace server.Dtos.Message
{
    [Authorize]
    public class ChatHub : Hub
    {
        private readonly IChatMessageRepository _chatMessageRepository;
        private readonly UserManager<server.Models.User> _userManager;

        public ChatHub(IChatMessageRepository chatMessageRepository, UserManager<server.Models.User> userManager)
        {
            _chatMessageRepository = chatMessageRepository;
            _userManager = userManager;
        }

        [Authorize]
        public async Task SendMessage(string message, int conversationId)
        {
            var userName = Context.User.GetUsername();
            if (string.IsNullOrEmpty(userName))
            {
                throw new HubException("User is not authenticated");
            }

            var user = await _userManager.FindByNameAsync(userName);

            if (user == null)
            {
                throw new HubException("User not found");
            }

            var chatMessage = new ChatMessage
            {
                UserId = user.Id,
                Message = message,
                ConversationId = conversationId,
                CreatedAt = DateTime.UtcNow
            };
            await _chatMessageRepository.AddMessageAsync(chatMessage);

            // Log thông tin gửi đi
            Console.WriteLine($"Sending message to group {conversationId}: {user.Name} - {message}");

            await Clients.Group(conversationId.ToString()).SendAsync("ReceiveMessage", user.Name, message, user.Email)
                .ContinueWith(task =>
                {
                    if (task.IsCompletedSuccessfully)
                    {
                        Console.WriteLine($"Message successfully sent to group {conversationId}");
                    }
                    else
                    {
                        Console.WriteLine($"Failed to send message to group {conversationId}: {task.Exception}");
                    }
                });
        }



        [Authorize]
        public async Task JoinConversation(int conversationId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, conversationId.ToString());
            Console.WriteLine($"Connection {Context.ConnectionId} joined group {conversationId}");
        }

        [Authorize]
        public async Task LeaveConversation(int conversationId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, conversationId.ToString());
        }
    }


}
