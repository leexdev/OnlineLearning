using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Dtos.LessonCompleted
{
    public class LessonCompletedDto
    {
        public int Id { get; set; }
        public string? UserId { get; set; }
        public int LessonId { get; set; }
    }
}