using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using server.Dtos.Answer;

public class CreateQuestionDto
{
    [Required(ErrorMessage = "Nội dung là bắt buộc.")]
    public string Content { get; set; } = string.Empty;

    [StringLength(1000, ErrorMessage = "Giải thích không được dài quá 1000 ký tự.")]
    public string? Explanation { get; set; }
    public int LessonId { get; set; }
    public string Language { get; set; } = "vi";
    public bool IsPronounce { get; set; } = false;
    public bool IsSortable { get; set; } = false;
    public List<CreateAnswerDto> Answers { get; set; } = new List<CreateAnswerDto>();
}
