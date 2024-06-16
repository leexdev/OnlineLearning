using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Dtos.Question
{
    public class UpdateQuestionDto
    {
        public string Content { get; set; } = string.Empty;
        public string? Explanation { get; set; }
        public int LessonId { get; set; }
        public string Language { get; set; } = "vi";
        public bool IsPronounce { get; set; } = false;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}