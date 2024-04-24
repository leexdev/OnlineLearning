using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class Comment : BaseModel
    {
        public int Id { get; set; }
        public string Content { get; set; } = string.Empty;
        public int? UserId { get; set; }
        public int? LessonId { get; set; }
        public Lesson? Lesson { get; set; }
        public User? User { get; set; }
    }
}