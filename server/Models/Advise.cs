using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    [Table("Advises")]
    public class Advise : BaseModel
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? PhoneNumber { get; set; }
        public string? BirthDay { get; set; }
        public string? Academic { get; set; }
        public string? Status { get; set; } = "Chưa tư vấn";
        public int courseId { get; set; }
        public Course? Course { get; set; }
    }
}