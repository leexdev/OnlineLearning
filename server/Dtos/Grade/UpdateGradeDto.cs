using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace server.Dtos.Grade
{
    public class UpdateGradeDto
    {
        [Required(ErrorMessage = "Tên lớp không được để trống")]
        [MinLength(5, ErrorMessage = "Tên lớp phải tối thiếu 5 ký tự")]
        [MaxLength(50, ErrorMessage = "Tên lớp tối đa 50 ký tự")]
        public string Name { get; set; } = string.Empty;
    }
}