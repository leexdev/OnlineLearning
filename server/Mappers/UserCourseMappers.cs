using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Dtos.UserCourse;
using server.Models;

namespace server.Mappers
{
    public static class UserCourseMappers
    {
        public static UserCourse ToUserCourseFromCreate(this CreateUserCourseDto courseDto)
        {
            return new UserCourse
            {
                CourseId = courseDto.CourseId,
                UserId = courseDto.UserId
            };
        }
    }
}