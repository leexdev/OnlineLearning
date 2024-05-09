using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    [Table("Courses")]
    public class Course : BaseModel
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int Price { get; set; }
        public int? NewPrice { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public int SubjectId { get; set; }
        public int? DiscountId { get; set; }
        public bool IsDeleted { get; set; } = false;
        public Discount? Discount { get; set; }
        public Subject? Subject { get; set; }
        public List<Chapter> Chapters { get; set; } = new List<Chapter>();
        public List<UserCourse> UserCourses { get; set; } = new List<UserCourse>();
        public List<Payment> Payments { get; set; } = new List<Payment>();
    }
}