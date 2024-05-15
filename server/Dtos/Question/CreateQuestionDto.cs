using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Dtos.Question
{
    public class CreateQuestionDto
    {
        public string Content { get; set; } = string.Empty;
        public int LessonId { get; set; }
    }
}