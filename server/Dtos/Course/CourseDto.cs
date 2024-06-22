using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Dtos.Chapter;
using server.Dtos.UserCourse;

namespace server.Dtos.Course
{
    public class CourseDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int Price { get; set; }
        public int? NewPrice { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public int SubjectId { get; set; }
        public string? SubjectName { get; set; }
        public List<ChapterDto> Chapters { get; set; } = new List<ChapterDto>();
        public List<UserCourseDto> UserCourses { get; set; } = new List<UserCourseDto>();
    }
}