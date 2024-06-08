using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Dtos.UserAnswerHistory
{
    public class UserAnswerHistoryDto
    {
        public int Id { get; set; }
        public string UserId { get; set; } = string.Empty;
        public int QuestionId { get; set; }
        public bool IsCorrect { get; set; }
        public int LessonId { get; set; }
        public string? LessonTitle { get; set; }
        public string? QuestionContent { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}