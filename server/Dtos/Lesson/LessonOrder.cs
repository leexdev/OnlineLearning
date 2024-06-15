using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Dtos.Lesson
{
    public class LessonOrder
    {
        public int Id { get; set; }
        public int ChapterId { get; set; }
        public int Order { get; set; }
        public DateTime UpdatedAt { get; set; } = DateTime.Now;

    }
}