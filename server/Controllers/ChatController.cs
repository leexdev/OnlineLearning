using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using server.Dtos.Chat;
using server.Dtos.User;
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
        private readonly IUserRepository _userRepository;
        private readonly UserManager<User> _userManager;


        public ChatController(IChatMessageRepository chatMessageRepository, IConversationRepository conversationRepository, IUserRepository userRepository, UserManager<User> userManager)
        {
            _chatMessageRepository = chatMessageRepository;
            _conversationRepository = conversationRepository;
            _userRepository = userRepository;
            _userManager = userManager;
        }

        [HttpGet("conversation/contact/{contactId}")]
        [Authorize]
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
        [Authorize]
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
        [Authorize]
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

            if (!message.Conversation.UserConversations.Any(uc => uc.UserId == user.Id))
            {
                return Forbid("You are not allowed to read this message.");
            }

            message.IsRead = true;
            await _chatMessageRepository.UpdateMessageAsync(message);

            return NoContent();
        }

        [HttpGet("contacts/teachers-courses")]
        [Authorize]
        public async Task<IActionResult> GetTeachersForStudentCourses()
        {
            var userName = User.GetUsername();
            var student = await _userManager.FindByNameAsync(userName);

            if (student == null)
            {
                return NotFound("Student not found.");
            }

            var teachers = await _userRepository.GetTeachersForStudentCoursesAsync(student.Id);
            var teacherDtos = teachers.Select(t => t.ToTeacherDto());

            return Ok(teacherDtos);
        }

        [HttpGet("contacts/students")]
        [Authorize(Roles = "Teacher")]
        public async Task<IActionResult> GetStudentsForTeacher()
        {
            var userName = User.GetUsername();
            var user = await _userManager.FindByNameAsync(userName);
            var userCurrent = await _userRepository.GetUserByIdAsync(user.Id);
            var students = await _userRepository.GetStudentsForTeacher(user.Id);
            var studentDtos = new List<UserDto>();

            foreach (var student in students)
            {
                var conversations = userCurrent.UserConversations.Select(uc => uc.ConversationId).ToList();
                ChatMessage lastMessageOverall = null;

                foreach (var id in conversations)
                {
                    var lastMessage = await _chatMessageRepository.GetLastMessageByConversationIdAsync(id);
                    if (lastMessage != null)
                    {
                        if (lastMessage.UserId == student.Id || lastMessage.Conversation.UserConversations.Any(uc => uc.UserId == student.Id))
                        {
                            if (lastMessageOverall == null || lastMessage.CreatedAt > lastMessageOverall.CreatedAt)
                            {
                                lastMessageOverall = lastMessage;
                            }
                        }
                    }
                }

                studentDtos.Add(new UserDto
                {
                    Id = student.Id,
                    Name = student.Name,
                    Avatar = student.Avatar,
                    LastMessage = lastMessageOverall?.Message,
                    LastMessageTime = lastMessageOverall?.CreatedAt,
                    LastMessageIsRead = lastMessageOverall?.IsRead
                });
            }

            studentDtos = studentDtos.OrderByDescending(s => s.LastMessageTime).ToList();

            return Ok(studentDtos);
        }
    }
}
