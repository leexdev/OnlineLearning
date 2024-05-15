using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Dtos.Question
{
    public class QuestionDto
    {
        public int Id { get; set; }
        public string Content { get; set; } = string.Empty;
        public int LessonId { get; set; }
        // public List<Answer> Answers { get; set; } = new List<Answer>();
    }
}