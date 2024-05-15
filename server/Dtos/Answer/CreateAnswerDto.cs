using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Dtos.Answer
{
    public class CreateAnswerDto
    {
        public string Content { get; set; } = string.Empty;
        public bool IsCorrect { get; set; } = false;
        public int QuestionId { get; set; }
    }
}