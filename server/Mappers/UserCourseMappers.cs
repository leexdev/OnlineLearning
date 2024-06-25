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
        public static UserCourseDto ToUserCourseDto(this UserCourse courseModel)
        {
            return new UserCourseDto
            {
                CourseId = courseModel.CourseId,
                UserId = courseModel.UserId,
                IsTeacher = courseModel.IsTeacher
            };
        }

        public static UserCourse ToUserCourseFromCreate(this CreateUserCourseDto courseDto)
        {
            return new UserCourse
            {
                CourseId = courseDto.CourseId,
                UserId = courseDto.UserId
            };
        }

        public static List<UserCourse> ToTeacherCoursesFromCreate(this CreateTeacherCourseDto createDto, int courseId)
        {
            return createDto.TeacherIds.Select(teacherId => new UserCourse
            {
                UserId = teacherId,
                CourseId = courseId,
            }).ToList();
        }
    }
}