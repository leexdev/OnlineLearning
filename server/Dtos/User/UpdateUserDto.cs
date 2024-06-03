using System;
using System.ComponentModel.DataAnnotations;

public class UpdateUserDto
{
    [StringLength(50, ErrorMessage = "Tên không được vượt quá 50 ký tự")]
    public string? Name { get; set; }

    [StringLength(15, ErrorMessage = "Số điện thoại không được vượt quá 15 ký tự")]
    public string PhoneNumber { get; set; } = string.Empty;

    [DataType(DataType.Date, ErrorMessage = "Định dạng ngày sinh không hợp lệ")]
    [CustomValidation(typeof(UpdateUserDto), nameof(ValidateBirthDay))]
    public DateTime? BirthDay { get; set; }
    public string? Sex { get; set; }

    public static ValidationResult? ValidateBirthDay(DateTime? birthDay, ValidationContext context)
    {
        if (birthDay != null && birthDay > DateTime.Now)
        {
            return new ValidationResult("Ngày sinh không thể lớn hơn ngày hiện tại");
        }
        return ValidationResult.Success;
    }
}
