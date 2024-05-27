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
            var user = new User { UserName = registerDto.Email, Email = registerDto.Email };
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

        public async Task<List<User>> GetAllAsync()
        {
            return await _userManager.Users.Where(u => !u.IsDeleted).ToListAsync();
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
            // Lấy các vai trò hiện tại của người dùng
            var existingRoles = await _userManager.GetRolesAsync(user);

            // Tìm các vai trò mới cần thêm
            var rolesToAdd = newRoles.Except(existingRoles);

            // Tìm các vai trò cũ cần xóa
            var rolesToRemove = existingRoles.Except(newRoles);

            // Thêm các vai trò mới
            var resultAdd = await _userManager.AddToRolesAsync(user, rolesToAdd);

            // Xóa các vai trò cũ
            var resultRemove = await _userManager.RemoveFromRolesAsync(user, rolesToRemove);

            // Trả về kết quả (true nếu thành công, false nếu thất bại)
            return resultAdd.Succeeded && resultRemove.Succeeded;
        }

        public async Task<User?> GetUserByIdAsync(string userId)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.Id == userId && !u.IsDeleted);
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

            user.Email = userModel.Email;
            user.PhoneNumber = userModel.PhoneNumber;
            user.Name = userModel.Name;
            user.BirthDay = userModel.BirthDay;
            user.Sex = userModel.Sex;
            user.Avatar = userModel.Avatar;

            await _userManager.UpdateAsync(user);
            return user;
        }
    }

}