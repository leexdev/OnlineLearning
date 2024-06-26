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
        public string? Name { get; set; }
        public DateTime? BirthDay { get; set; }
        public string? Sex { get; set; }
        public string? Avatar { get; set; }
        public bool IsDeleted { get; set; } = false;
        public List<UserCourse> UserCourses { get; set; } = new List<UserCourse>();
        public List<Payment> Payments { get; set; } = new List<Payment>();
        public List<Rating> Ratings { get; set; } = new List<Rating>();
        public List<Comment> Comments { get; set; } = new List<Comment>();
        public List<LessonCompleted> LessonCompletes { get; set; } = new List<LessonCompleted>();
        public List<UserAnswerHistory> UserAnswerHistories { get; set; } = new List<UserAnswerHistory>();
        public List<ChatMessage> ChatMessages { get; set; } = new List<ChatMessage>();
        public List<UserConversation> UserConversations { get; set; } = new List<UserConversation>();
        public DateTime? CreatedAt { get; set; } = DateTime.Now;
        public DateTime? UpdatedAt { get; set; } = DateTime.Now;
    }
}