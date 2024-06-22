using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Dtos.Payment
{
    public class PaymentDto
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string? UserName { get; set; }
        public string? CourseName { get; set; }
        public int? Amount { get; set; }
        public int? CourseId { get; set; }
        public string? Status { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}