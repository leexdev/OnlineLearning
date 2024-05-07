using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace server.Dtos.Banner
{
    public class CreateBannerDto
    {
        [Required(ErrorMessage = "Ảnh không được để trống!")]
        public string ImageUrl { get; set; } = string.Empty;
        public string? Link { get; set; } = string.Empty;
    }
}