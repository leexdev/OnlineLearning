using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace server.Dtos.Lesson
{
    public class UpdateLessonDto
    {
        [Required(ErrorMessage = "Tiêu đề không được để trống")]
        [StringLength(100, ErrorMessage = "Tiêu đề không được vượt quá 100 ký tự")]
        public string Title { get; set; } = string.Empty;
        [StringLength(500, ErrorMessage = "Mô tả không vượt quá 500 ký tự")]
        public string? Description { get; set; } = string.Empty;
        public bool isFree { get; set; } = false;
        public int ChapterId { get; set; }
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}