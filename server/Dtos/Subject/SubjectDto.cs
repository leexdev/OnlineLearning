using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Dtos.Course;

namespace server.Dtos.Subject
{
    public class SubjectDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int? GradeId { get; set; }
        public List<CourseDto> Courses { get; set; } = new List<CourseDto>();
    }
}