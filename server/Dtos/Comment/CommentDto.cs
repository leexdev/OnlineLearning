using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Dtos.Comment
{
    public class CommentDto
    {
        public int Id { get; set; }
        public string? UserId { get; set; }
        public int LessonId { get; set; }
        public string Content { get; set; } = string.Empty;
    }
}