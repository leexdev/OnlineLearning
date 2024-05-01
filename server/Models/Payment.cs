using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    [Table("Payments")]
    public class Payment : BaseModel
    {
        public string? UserId { get; set; }
        public int CourseId { get; set; }
        public int Amount { get; set; }
        public string PaymentMethod { get; set; } = string.Empty;
        public bool IsDeleted { get; set; } = false;
        public Course? Course { get; set; }
        public User? User { get; set; }
    }
}