using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace server.Dtos.Chapter
{
    public class CreateChapterDto
    {
        [Required(ErrorMessage = "Tên chương không được để trống.")]
        [StringLength(100, ErrorMessage = "Tên chương tối đa 100 ký tự.")]
        public string Name { get; set; } = string.Empty;
        public int CourseId { get; set; }
    }
}