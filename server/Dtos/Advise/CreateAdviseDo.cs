using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace server.Dtos.Advise
{
    public class CreateAdviseDo
    {
        [Required(ErrorMessage = "Họ và tên là bắt buộc")]
        public string? Name { get; set; }
        [Required(ErrorMessage = "Năm sinh là bắt buộc")]
        public string? BirthDay { get; set; }
        [Required(ErrorMessage = "Học lực là bắt buộc")]
        public string? Academic { get; set; }
        [Required(ErrorMessage = "Số điện thoại là bắt buộc")]
        public string? PhoneNumber { get; set; }
        [Required]
        public int courseId { get; set; }
    }
}