using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using server.Dtos.Chat;
using server.Extensions;
using server.Interfaces;
using server.Mappers;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChatController : ControllerBase
    {
        private readonly IChatMessageRepository _chatMessageRepository;
        private readonly IConversationRepository _conversationRepository;
        private readonly UserManager<User> _userManager;


        public ChatController(IChatMessageRepository chatMessageRepository, IConversationRepository conversationRepository, UserManager<User> userManager)
        {
            _chatMessageRepository = chatMessageRepository;
            _conversationRepository = conversationRepository;
            _userManager = userManager;
        }

        [HttpGet("conversation/contact/{contactId}")]
        public async Task<IActionResult> GetConversationWithContact(string contactId)
        {
            var userName = User.GetUsername();
            var user = await _userManager.FindByNameAsync(userName);
            var conversation = await _conversationRepository.GetConversationWithContactAsync(user.Id, contactId);

            if (conversation == null)
            {
                return NotFound();
            }

            return Ok(conversation);
        }

        [HttpPost("conversation/{contactId}")]
        public async Task<IActionResult> CreateConversation(string contactId)
        {
            var userName = User.GetUsername();
            var user = await _userManager.FindByNameAsync(userName);
            var conversation = await _conversationRepository.CreateConversationAsync(user.Id, contactId);

            if (conversation == null)
            {
                return BadRequest("Cannot create conversation.");
            }

            return Ok(conversation);
        }

        [HttpGet("conversation/{conversationId}/messages")]
        public async Task<IActionResult> GetMessages(int conversationId, int page = 1, int pageSize = 15)
        {
            var messages = await _chatMessageRepository.GetMessagesByConversationIdAsync(conversationId, page, pageSize);
            var messageDtos = messages.Select(m => m.ToChatMessageDto()).ToList();
            return Ok(messageDtos);
        }

        [HttpPost("messages/{messageId}/read")]
        [Authorize]
        public async Task<IActionResult> MarkMessageAsRead(int messageId)
        {
            var userName = User.GetUsername();
            var user = await _userManager.FindByNameAsync(userName);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            var message = await _chatMessageRepository.GetMessageByIdAsync(messageId);
            if (message == null)
            {
                return NotFound("Message not found.");
            }

            // Kiểm tra xem người dùng có quyền đánh dấu tin nhắn này là đã đọc hay không
            if (!message.Conversation.UserConversations.Any(uc => uc.UserId == user.Id))
            {
                return Forbid("You are not allowed to read this message.");
            }

            message.IsRead = true;
            await _chatMessageRepository.UpdateMessageAsync(message);

            return NoContent();
        }

    }
}
