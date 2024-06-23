using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Dtos.Advise
{
    public class AdviseDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? BirthDay { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Academic { get; set; }
        public string? Status { get; set; }
        public int courseId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}