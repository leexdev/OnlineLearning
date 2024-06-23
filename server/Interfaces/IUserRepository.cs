using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using server.Dtos.User;
using server.Helpers;
using server.Models;

namespace server.Interfaces
{
    public interface IUserRepository
    {
        Task<(bool Succeeded, IEnumerable<IdentityError> Errors, NewUserDto User)> RegisterUserAsync(RegisterDto registerDto);
        Task<(bool Succeeded, string Error, NewUserDto User)> CheckUserLoginAsync(LoginDto loginDto);
        Task<List<User>> GetAllAsync();
        Task<(List<User> Users, int TotalRecords)> GetPageAsync(QueryObject queryObject);
        Task<List<User>> GetTeachers();
        Task<List<User>> GetUsers();
        Task<List<User>> GetAllExceptCurrentAsync(string userId);
        Task<bool> ChangeUserRolesAsync(User user, string[] newRoles);
        Task<User?> GetUserByIdAsync(string userId);
        Task<bool> RoleExistsAsync(string roleName);
        Task<User?> UpdateAsync(string id, User user);
        Task<User?> ChangePassword(string id, string currentPassword, string newPassword);
        Task<User?> DeleteAsync(string userId);
    }
}