using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        public async Task<IActionResult> GetMessages(int conversationId)
        {
            var messages = await _chatMessageRepository.GetMessagesByConversationIdAsync(conversationId);
            var messageDtos = messages.Select(m => m.ToChatMessageDto()).ToList();
            return Ok(messageDtos);
        }
    }
}
