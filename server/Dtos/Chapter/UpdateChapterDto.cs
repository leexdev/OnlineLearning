using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Dtos.Chapter
{
    public class UpdateChapterDto
    {
        public string Name { get; set; } = string.Empty;
        public int CourseId { get; set; }
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}