using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    [Table("Comments")]
    public class Comment : BaseModel
    {
        public string? UserId { get; set; }
        public int LessonId { get; set; }
        public string Content { get; set; } = string.Empty;
        public Lesson? Lesson { get; set; }
        public User? User { get; set; }
    }
}