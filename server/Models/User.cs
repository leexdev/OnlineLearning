using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace server.Models
{
    [Table("Users")]
    public class User : IdentityUser
    {
        public DateTime? BirthDay { get; set; }
        public string? Sex { get; set; }
        public string? Avatar { get; set; }
        public bool IsDeleted { get; set; } = false;
        public List<UserCourse> UserCourses { get; set; } = new List<UserCourse>();
        public List<Payment> Payments { get; set; } = new List<Payment>();
        public List<Rating> Ratings { get; set; } = new List<Rating>();
        public List<Comment> Comments { get; set; } = new List<Comment>();
    }
}