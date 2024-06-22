using System.ComponentModel.DataAnnotations;

namespace server.Dtos.Course
{
    public class CreateCourseDto
    {
        [Required(ErrorMessage = "Tên khóa học không được để trống")]
        [MaxLength(100, ErrorMessage = "Tên khóa học không được vượt quá 100 ký tự")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Tiêu đề không được để trống")]
        [MaxLength(200, ErrorMessage = "Tiêu đề không được vượt quá 200 ký tự")]
        public string Title { get; set; } = string.Empty;

        [Required(ErrorMessage = "Mô tả khóa học không được để trống")]
        public string Description { get; set; } = string.Empty;

        [Required(ErrorMessage = "Giá không được để trống")]
        public int Price { get; set; }
        public string ImageUrl { get; set; } = string.Empty;

        [Required(ErrorMessage = "Môn học không được để trống")]
        public int SubjectId { get; set; }
    }

}
