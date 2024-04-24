using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class UserCourse : BaseModel
    {
        public int Id { get; set; }
        public int? CourseId { get; set; }
        public int? UserId { get; set; }
        public bool IsTeacher { get; set; } = false;
        public User? User { get; set; }
        public Course? Course { get; set; }
    }
}