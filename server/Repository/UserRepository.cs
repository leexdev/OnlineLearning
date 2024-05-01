using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using server.Dtos.User;
using server.Interfaces;
using server.Models;

namespace server.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly UserManager<User> _userManager;
        private readonly ITokenService _tokenService;
        private readonly SignInManager<User> _signInManager;

        public UserRepository(UserManager<User> userManager, ITokenService tokenService, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signInManager = signInManager;
        }

        public async Task<(bool Succeeded, IEnumerable<IdentityError> Errors, NewUserDto User)> RegisterUserAsync(RegisterDto registerDto)
        {
            var user = new User { UserName = registerDto.UserName, Email = registerDto.Email };
            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded)
                return (false, result.Errors, null);

            var roleResult = await _userManager.AddToRoleAsync(user, "User");
            if (!roleResult.Succeeded)
                return (false, roleResult.Errors, null);

            var newUserDto = new NewUserDto
            {
                UserName = user.UserName,
                Email = user.Email,
                Token = _tokenService.CreateToken(user)
            };

            return (true, null, newUserDto);
        }

        public async Task<(bool Succeeded, string Error, NewUserDto User)> CheckUserLoginAsync(LoginDto loginDto)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == loginDto.UserName.ToLower());
            if (user == null)
                return (false, "Invalid username", null);

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
            if (!result.Succeeded)
                return (false, "Username not found and/or password incorrect", null);

            var newUserDto = new NewUserDto
            {
                UserName = user.UserName,
                Email = user.Email,
                Token = _tokenService.CreateToken(user)
            };

            return (true, null, newUserDto);
        }
    }

}