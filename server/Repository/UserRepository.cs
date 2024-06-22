using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using server.Dtos.User;
using server.Helpers;
using server.Interfaces;
using server.Models;

namespace server.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly UserManager<User> _userManager;
        private readonly ITokenService _tokenService;
        private readonly SignInManager<User> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public UserRepository(UserManager<User> userManager, ITokenService tokenService, SignInManager<User> signInManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signInManager = signInManager;
            _roleManager = roleManager;
        }

        public async Task<(bool Succeeded, IEnumerable<IdentityError> Errors, NewUserDto User)> RegisterUserAsync(RegisterDto registerDto)
        {
            var user = new User { UserName = registerDto.Email, Email = registerDto.Email, Name = registerDto.Name };
            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded)
                return (false, result.Errors, null);

            var roleResult = await _userManager.AddToRoleAsync(user, "User");
            if (!roleResult.Succeeded)
                return (false, roleResult.Errors, null);

            var newUserDto = new NewUserDto
            {
                Email = user.UserName,
                Token = await _tokenService.CreateToken(user)
            };

            return (true, null, newUserDto);
        }

        public async Task<(bool Succeeded, string Error, NewUserDto User)> CheckUserLoginAsync(LoginDto loginDto)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == loginDto.Email.ToLower() && !x.IsDeleted);
            if (user == null)
                return (false, "Tên đăng nhập không tồn tại", null);

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
            if (!result.Succeeded)
                return (false, "Mật khẩu không chính xác", null);

            var newUserDto = new NewUserDto
            {
                Email = user.Email,
                Token = await _tokenService.CreateToken(user)
            };

            return (true, null, newUserDto);
        }

        public async Task<(List<User> Users, int TotalRecords)> GetPageAsync(QueryObject queryObject)
        {
            var query = _userManager.Users.Where(u => !u.IsDeleted);

            if (!string.IsNullOrEmpty(queryObject.SearchTerm))
            {
                query = query.Where(u => u.Name.Contains(queryObject.SearchTerm) || u.Email.Contains(queryObject.SearchTerm));
            }

            var totalRecords = await query.CountAsync();
            var users = await query
                .Skip((queryObject.Page - 1) * queryObject.PageSize)
                .Take(queryObject.PageSize)
                .ToListAsync();

            return (users, totalRecords);
        }

        public async Task<List<User>> GetTeachers()
        {
            var usersInRole = await _userManager.GetUsersInRoleAsync("Teacher");
            return usersInRole.Where(u => !u.IsDeleted).ToList();
        }

        public async Task<List<User>> GetUsers(DateTime? startDate, DateTime? endDate)
        {
            var usersInRole = await _userManager.GetUsersInRoleAsync("User");

            var query = usersInRole.AsQueryable().Where(u => !u.IsDeleted);

            if (startDate.HasValue)
            {
                query = query.Where(u => u.CreatedAt >= startDate.Value);
            }

            if (endDate.HasValue)
            {
                query = query.Where(u => u.CreatedAt <= endDate.Value);
            }

            return await query.ToListAsync();
        }

        public async Task<List<User>> GetAllExceptCurrentAsync(string userId)
        {
            return await _userManager.Users.Where(u => u.Id != userId && !u.IsDeleted).ToListAsync();
        }

        public async Task<User?> DeleteAsync(string userId)
        {
            var user = await GetUserByIdAsync(userId);
            if (user == null)
            {
                return null;
            }
            user.IsDeleted = true;

            await _userManager.UpdateAsync(user);
            return user;
        }

        public async Task<bool> ChangeUserRolesAsync(User user, string[] newRoles)
        {
            var existingRoles = await _userManager.GetRolesAsync(user);

            var rolesToAdd = newRoles.Except(existingRoles);

            var rolesToRemove = existingRoles.Except(newRoles);

            var resultAdd = await _userManager.AddToRolesAsync(user, rolesToAdd);

            var resultRemove = await _userManager.RemoveFromRolesAsync(user, rolesToRemove);

            return resultAdd.Succeeded && resultRemove.Succeeded;
        }

        public async Task<User?> GetUserByIdAsync(string userId)
        {
            var user = await _userManager.Users.Include(u => u.UserConversations).FirstOrDefaultAsync(u => u.Id == userId && !u.IsDeleted);
            if (user == null)
            {
                return null;
            }

            return user;
        }

        public async Task<bool> RoleExistsAsync(string roleName)
        {
            var allRoles = await _roleManager.Roles.ToListAsync();
            return allRoles.Any(r => r.Name == roleName);
        }

        public async Task<User?> UpdateAsync(string id, User userModel)
        {
            var user = await GetUserByIdAsync(id);
            if (user == null)
            {
                return null;
            }

            user.PhoneNumber = userModel.PhoneNumber;
            user.Name = userModel.Name;
            user.BirthDay = userModel.BirthDay;
            user.Sex = userModel.Sex;

            await _userManager.UpdateAsync(user);
            return user;
        }

        public async Task<User?> ChangePassword(string id, string currentPassword, string newPassword)
        {
            var user = await GetUserByIdAsync(id);
            if (user == null)
            {
                return null;
            }

            await _userManager.ChangePasswordAsync(user, currentPassword, newPassword);

            return user;
        }

        public async Task<List<User>> GetAllAsync()
        {
            return await _userManager.Users.Where(u => !u.IsDeleted).ToListAsync();
        }
    }

}