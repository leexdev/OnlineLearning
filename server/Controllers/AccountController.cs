using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Dtos.User;
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
        private readonly IUserRepository _userRepository;
        private readonly UserManager<User> _userManager;

        public AccountController(IUserRepository userRepository, UserManager<User> userManager)
        {
            _userRepository = userRepository;
            _userManager = userManager;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var (succeeded, error, userDto) = await _userRepository.CheckUserLoginAsync(loginDto);

            if (!succeeded)
                return Unauthorized(error);

            return Ok(userDto);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto registerDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var (succeeded, errors, userDto) = await _userRepository.RegisterUserAsync(registerDto);

            if (!succeeded)
                return StatusCode(500, errors);

            return Ok(userDto);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var users = await _userRepository.GetAllAsync();

            var userDtos = new List<UserDto>();

            foreach (var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);
                var userDto = new UserDto
                {
                    Id = user.Id,
                    UserName = user.UserName,
                    Email = user.Email,
                    PhoneNumber = user.PhoneNumber,
                    BirthDay = user.BirthDay,
                    Sex = user.Sex,
                    Avatar = user.Avatar,
                    Roles = roles
                };
                userDtos.Add(userDto);
            }

            return Ok(userDtos);
        }

        [HttpPost("/changeroles/{userId}")]
        public async Task<IActionResult> ChangeRoles(string userId, [FromBody] string[] newRoles)
        {
            var user = await _userRepository.GetUserByIdAsync(userId);

            if (user == null)
            {
                return NotFound();
            }

            foreach (var role in newRoles)
            {
                var roleExists = await _userRepository.RoleExistsAsync(role);
                if (!roleExists)
                {
                    return BadRequest($"Vai trò '{role}' không tồn tại.");
                }
            }

            var result = await _userRepository.ChangeUserRolesAsync(user, newRoles);

            if (result)
            {
                return Ok("Thay đổi quyền thành công");
            }
            else
            {
                return StatusCode(500, "Không thể thay đổi quyền");
            }
        }

        [HttpPut("update/user")]
        public async Task<IActionResult> Update(string id, UpdateUserDto userDto)
        {
            var user = await _userRepository.UpdateAsync(id, userDto.ToUserFromUpdate());
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
            var userName = HttpContext.User?.FindFirst(ClaimTypes.GivenName)?.Value;
            var user = await _userManager.FindByNameAsync(userName);
            var userModel = await _userRepository.UpdateAsync(user.Id, userDto.ToUserFromUpdate());
            if (userModel == null)
            {
                return NotFound();
            }

            return Ok(userModel.ToUserDto());
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(string id)
        {
            var user = await _userRepository.DeleteAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}