using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Dtos.User;
using server.Models;

namespace server.Mappers
{
    public static class UserMappers
    {
        public static UserDto ToUserDto(this User userModel)
        {
            return new UserDto
            {
                Id = userModel.Id,
                Email = userModel.Email,
                PhoneNumber = userModel.PhoneNumber,
                BirthDay = userModel.BirthDay,
                Sex = userModel.Sex,
                Avatar = userModel.Avatar
            };
        }
        public static User ToUserFromUpdate(this UpdateUserDto userDto)
        {
            return new User
            {
                PhoneNumber = userDto.PhoneNumber,
                BirthDay = userDto.BirthDay,
                Sex = userDto.Sex
            };
        }
    }
}