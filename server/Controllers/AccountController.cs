using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using server.Dtos.User;
using server.Extensions;
using server.Helpers;
using server.Interfaces;
using server.Mappers;
using server.Models;
using server.Repository;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IUserRepository _userRepo;
        private readonly UserManager<User> _userManager;
        private readonly IFireBaseService _firebaseService;
        private readonly IFileService _fileService;
        private readonly IChatMessageRepository _chatMessageRepository;

        public AccountController(IUserRepository userRepo, UserManager<User> userManager, IFireBaseService firebaseService, IFileService fileService, IChatMessageRepository chatMessageRepository)
        {
            _userRepo = userRepo;
            _userManager = userManager;
            _fileService = fileService;
            _firebaseService = firebaseService;
            _chatMessageRepository = chatMessageRepository;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            var existingUser = await _userManager.FindByNameAsync(loginDto.Email);
            if (existingUser == null)
            {
                ModelState.AddModelError("Email", "Địa chỉ email không tồn tại");
                return BadRequest(new ValidationProblemDetails(this.ModelState));
            }

            var signInResult = await _userManager.CheckPasswordAsync(existingUser, loginDto.Password);
            if (!signInResult)
            {
                ModelState.AddModelError("Password", "Mật khẩu không chính xác");
                return BadRequest(new ValidationProblemDetails(this.ModelState));
            }

            var (succeeded, error, userDto) = await _userRepo.CheckUserLoginAsync(loginDto);

            if (!succeeded)
                return Unauthorized(error);

            return Ok(userDto);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto registerDto)
        {
            var existingUser = await _userManager.FindByNameAsync(registerDto.Email);
            if (existingUser != null)
            {
                ModelState.AddModelError("Email", "Địa chỉ email đã được sử dụng.");
                return BadRequest(new ValidationProblemDetails(this.ModelState));
            }

            var (succeeded, errors, userDto) = await _userRepo.RegisterUserAsync(registerDto);

            if (!succeeded)
            {
                var errorObject = new { errors };
                return StatusCode(500, new { data = errorObject });
            }

            return Ok(userDto);
        }

        [HttpGet("get-all")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAll()
        {
            var users = await _userRepo.GetAllAsync();
            var userDtos = users.Select(u => u.ToUserDto());
            return Ok(userDtos);
        }

        [HttpGet("get-page")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetPage([FromQuery] QueryObject queryObject)
        {
            var (users, totalRecords) = await _userRepo.GetPageAsync(queryObject);

            var userDtos = new List<UserDto>();
            foreach (var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);
                var userDto = new UserDto
                {
                    Id = user.Id,
                    Email = user.Email,
                    PhoneNumber = user.PhoneNumber,
                    Name = user.Name,
                    BirthDay = user.BirthDay,
                    Sex = user.Sex,
                    Avatar = user.Avatar,
                    Roles = roles
                };
                userDtos.Add(userDto);
            }

            var result = new
            {
                Data = userDtos,
                TotalRecords = totalRecords,
                TotalPages = (int)Math.Ceiling(totalRecords / (double)queryObject.PageSize),
                PageSize = queryObject.PageSize,
                CurrentPage = queryObject.Page
            };

            return Ok(result);
        }


        [HttpGet("get-list-teacher")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetTeachers()
        {
            var users = await _userRepo.GetTeachers();
            var userDtos = users.Select(u => u.ToTeacherDto());
            return Ok(userDtos);
        }

        [HttpGet("get-list-user")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _userRepo.GetUsers();
            var userDtos = users.Select(u => u.ToUserDto());
            return Ok(userDtos);
        }

        [HttpPost("changeroles/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> ChangeRoles(string id, [FromBody] string[] newRoles)
        {
            var user = await _userRepo.GetUserByIdAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            foreach (var role in newRoles)
            {
                var roleExists = await _userRepo.RoleExistsAsync(role);
                if (!roleExists)
                {
                    return BadRequest($"Vai trò '{role}' không tồn tại.");
                }
            }

            var result = await _userRepo.ChangeUserRolesAsync(user, newRoles);

            if (result)
            {
                return Ok("Thay đổi quyền thành công");
            }
            else
            {
                return StatusCode(500, "Không thể thay đổi quyền");
            }
        }

        [HttpGet("get-user")]
        [Authorize]
        public async Task<IActionResult> GetUser()
        {
            var userName = User.GetUsername();
            var user = await _userManager.FindByNameAsync(userName);
            var userModel = await _userRepo.GetUserByIdAsync(user.Id);
            if (userModel == null)
            {
                return NotFound();
            }

            return Ok(user.ToUserDto());
        }

        [HttpPut("update/user{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(string id, UpdateUserDto userDto)
        {
            var user = await _userRepo.UpdateAsync(id, userDto.ToUserFromUpdate());
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user.ToUserDto());
        }

        [HttpPut("update/currentuser")]
        [Authorize]
        public async Task<IActionResult> UpdateCurrentUser(UpdateUserDto userDto)
        {
            var userName = User.GetUsername();
            var user = await _userManager.FindByNameAsync(userName);
            var userModel = await _userRepo.UpdateAsync(user.Id, userDto.ToUserFromUpdate());
            if (userModel == null)
            {
                return NotFound();
            }

            return Ok(userModel.ToUserDto());
        }

        [HttpDelete("delete/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(string id)
        {
            var user = await _userRepo.DeleteAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpPost("upload-image")]
        [Authorize]
        public async Task<IActionResult> UploadImage(IFormFile imageFile)
        {
            if (imageFile == null || imageFile.Length == 0)
                return BadRequest("Không có file nào được chọn");

            if (!_fileService.IsImageFile(imageFile))
                return BadRequest("Định dạng ảnh không phù hợp");

            try
            {
                var user = await _userManager.FindByNameAsync(User.GetUsername());
                if (user == null)
                    return Unauthorized("Không tìm thấy người dùng");

                var folderPath = $"avatar_user";
                var urlImage = await _firebaseService.HandleFile(user.Avatar, folderPath, imageFile);
                user.Avatar = urlImage;
                await _userManager.UpdateAsync(user);

                return Ok(new { avatar = urlImage });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Có lỗi xảy ra khi tải lên ảnh: {ex.Message}");
            }
        }

        [HttpPost("change-password")]
        [Authorize]
        public async Task<IActionResult> ChangePassword(ChangePasswordDto passwordDto)
        {
            var userName = User.GetUsername();
            var user = await _userManager.FindByNameAsync(userName);

            if (user == null)
            {
                return Unauthorized();
            }

            var updateResult = await _userRepo.ChangePassword(user.Id, passwordDto.CurrentPassword, passwordDto.Password);

            if (updateResult == null)
            {
                return BadRequest("Mật khẩu hiện tại không chính xác");
            }

            return Ok("Thay đổi mật khẩu thành công");
        }

        [HttpGet("contacts")]
        [Authorize]
        public async Task<IActionResult> GetContacts()
        {
            var userName = User.GetUsername();
            var user = await _userManager.FindByNameAsync(userName);
            var userCurrent = await _userRepo.GetUserByIdAsync(user.Id);
            var users = await _userRepo.GetAllExceptCurrentAsync(user.Id);
            var userDtos = new List<UserDto>();

            foreach (var userItem in users)
            {
                var conversations = userCurrent.UserConversations.Select(uc => uc.ConversationId).ToList();
                ChatMessage lastMessageOverall = null;

                foreach (var id in conversations)
                {
                    var lastMessage = await _chatMessageRepository.GetLastMessageByConversationIdAsync(id);
                    if (lastMessage != null)
                    {
                        if (lastMessage.UserId == userItem.Id || lastMessage.Conversation.UserConversations.Any(uc => uc.UserId == userItem.Id))
                        {
                            if (lastMessageOverall == null || lastMessage.CreatedAt > lastMessageOverall.CreatedAt)
                            {
                                lastMessageOverall = lastMessage;
                            }
                        }
                    }
                }

                userDtos.Add(new UserDto
                {
                    Id = userItem.Id,
                    Name = userItem.Name,
                    Avatar = userItem.Avatar,
                    LastMessage = lastMessageOverall?.Message,
                    LastMessageTime = lastMessageOverall?.CreatedAt,
                    LastMessageIsRead = lastMessageOverall?.IsRead
                });
            }

            userDtos = userDtos.OrderByDescending(u => u.LastMessageTime).ToList();

            return Ok(userDtos);
        }

    }
}