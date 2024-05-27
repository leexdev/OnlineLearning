using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Dtos.Comment;
using server.Dtos.LessonCompleted;
using server.Dtos.Question;
using server.Dtos.Rating;

namespace server.Dtos.Lesson
{
    public class LessonDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; } = string.Empty;
        public string VideoURL { get; set; } = string.Empty;
        public bool isFree { get; set; } = false;
        public int ChapterId { get; set; }
        public int Order { get; set; }
        public List<QuestionDto> Questions { get; set; } = new List<QuestionDto>();
        public List<CommentDto> Comments { get; set; } = new List<CommentDto>();
        public List<LessonCompletedDto> LessonCompletes { get; set; } = new List<LessonCompletedDto>();

    }
}