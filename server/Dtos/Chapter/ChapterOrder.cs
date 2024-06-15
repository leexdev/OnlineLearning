using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Dtos.Chapter
{
    public class ChapterOrder
    {
        public int Id { get; set; }
        public int CourseId { get; set; }
        public int Order { get; set; }
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}