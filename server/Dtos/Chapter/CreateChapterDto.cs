using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Dtos.Chapter
{
    public class CreateChapterDto
    {
        public string Name { get; set; } = string.Empty;
        public int CourseId { get; set; }
    }
}