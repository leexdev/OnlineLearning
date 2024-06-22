using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Dtos.UserCourse
{
    public class CreateTeacherCourseDto
    {
        public List<string> TeacherIds { get; set; }
        public bool IsTeacher { get; set; } = true;
    }
}