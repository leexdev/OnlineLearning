using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using server.Dtos.Answer;

namespace server.Dtos.Question
{
    public class UpdateQuestionDto
    {
        [Required(ErrorMessage = "Nội dung là bắt buộc.")]
        public string Content { get; set; } = string.Empty;
        [StringLength(1000, ErrorMessage = "Giải thích không được dài quá 1000 ký tự.")]
        public string? Explanation { get; set; }
        public int LessonId { get; set; }
        public string Language { get; set; } = "vi";
        public bool IsPronounce { get; set; } = false;
        public List<UpdateAnswerDto> Answers { get; set; } = new List<UpdateAnswerDto>();
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}