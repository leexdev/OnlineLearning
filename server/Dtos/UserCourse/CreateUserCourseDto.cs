using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Dtos.UserCourse
{
    public class CreateUserCourseDto
    {
        public string UserId { get; set; } = string.Empty;
        public int CourseId { get; set; }
        public bool IsTeacher { get; set; } = false;
    }
}