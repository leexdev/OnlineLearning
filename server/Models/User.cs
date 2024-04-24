using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class User : BaseModel
    {
        public int Id { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public DateTime BirthDay { get; set; }
        public string Sex { get; set; } = string.Empty;
        public string Avatar = string.Empty;
        public string Role = string.Empty;
        public bool IsDeleted { get; set; } = false;
        public List<UserCourse> CourseUsers { get; set; } = new List<UserCourse>();
        public List<Payment> Payments { get; set; } = new List<Payment>();
        public List<Rating> Ratings { get; set; } = new List<Rating>();
        public List<Comment> Comments { get; set; } = new List<Comment>();
    }
}