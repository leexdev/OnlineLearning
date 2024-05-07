using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Dtos.Course;
using server.Models;

namespace server.Interfaces
{
    public interface IUserCourseRepository
    {
        Task<List<CourseDto>> GetUserCourses(User user);
    }
}