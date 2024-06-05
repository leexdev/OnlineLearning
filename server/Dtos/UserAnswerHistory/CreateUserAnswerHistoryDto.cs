using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Dtos.UserAnswerHistory
{
    public class CreateUserAnswerHistoryDto
    {
        public int QuestionId { get; set; }
        public bool IsCorrect { get; set; }
    }
}