using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Dtos.Answer;

namespace server.Dtos.Question
{
    public class QuestionDto
    {
        public int Id { get; set; }
        public string Content { get; set; } = string.Empty;
        public string? Explanation { get; set; }
        public int LessonId { get; set; }
        public string Language { get; set; } = "vi";
        public bool IsPronounce { get; set; } = false;
        public List<AnswerDto> Answers { get; set; } = new List<AnswerDto>();
    }
}