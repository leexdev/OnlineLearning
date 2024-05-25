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
        public Guid Id { get; set;} = Guid.NewGuid();
        public string? UserId { get; set; }
        public int CourseId { get; set; }
        public int? Amount { get; set; }
        public string? Status { get; set; } = string.Empty;
        public Course? Course { get; set; }
        public User? User { get; set; }
    }
}