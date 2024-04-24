using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class Payment : BaseModel
    {
        public int Id { get; set; }
        public int Amount { get; set; }
        public string PaymentMethod { get; set; } = string.Empty;
        public int? CourseId { get; set; }
        public int? UserId { get; set; }
        public bool IsDeleted { get; set; } = false;
        public Course? Course { get; set; }
        public User? User { get; set; }
    }
}