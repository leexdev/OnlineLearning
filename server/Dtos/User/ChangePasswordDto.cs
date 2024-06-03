using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace server.Dtos.User
{
    public class ChangePasswordDto
    {
        [Required(ErrorMessage ="Mật khẩu không được để trống")]
        public string? CurrentPassword { get; set; }
        [Required(ErrorMessage ="Mật khẩu không được để trống")]
        [RegularExpression("^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*\\W).{8,}$",
        ErrorMessage = "Mật khẩu phải bao gồm ít nhất một ký tự chữ hoa, một ký tự chữ thường, một số, một ký tự đặc biệt và ít nhất 8 ký tự.")]
        public string? Password { get; set; }
    }
}