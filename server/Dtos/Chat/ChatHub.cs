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
                ConversationId = conversationId
            };
            await _chatMessageRepository.AddMessageAsync(chatMessage);

            await Clients.Group(conversationId.ToString()).SendAsync("ReceiveMessage", user.Name, message, user.Email);
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
