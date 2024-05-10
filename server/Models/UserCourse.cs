using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    [Table("UserCourses")]
    public class UserCourse : BaseModel
    {
        public int Id { get; set; }
        public string UserId { get; set; } = string.Empty;
        public int CourseId { get; set; }
        public bool IsTeacher { get; set; } = false;
        public User? User { get; set; }
        public Course? Course { get; set; }
    }
}