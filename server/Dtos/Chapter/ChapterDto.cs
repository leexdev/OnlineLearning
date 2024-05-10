using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Dtos.Lesson;

namespace server.Dtos.Chapter
{
    public class ChapterDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int CourseId { get; set; }
        public List<LessonDto> Lessons { get; set; } = new List<LessonDto>();
    }
}