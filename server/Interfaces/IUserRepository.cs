using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using server.Dtos.User;

namespace server.Interfaces
{
    public interface IUserRepository
    {
        Task<(bool Succeeded, IEnumerable<IdentityError> Errors, NewUserDto User)> RegisterUserAsync(RegisterDto registerDto);
        Task<(bool Succeeded, string Error, NewUserDto User)> CheckUserLoginAsync(LoginDto loginDto);
    }

}