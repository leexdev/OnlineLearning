using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        public AccountController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
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
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var (succeeded, errors, userDto) = await _userRepository.RegisterUserAsync(registerDto);

            if (!succeeded)
                return StatusCode(500, errors);

            return Ok(userDto);
        }

    }
}