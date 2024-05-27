using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    [Table("Ratings")]
    public class Rating : BaseModel
    {
        public int Id { get; set; }
        public string? UserId { get; set; }
        public int CourseId { get; set; }
        public int Score { get; set; }
        public Course? Course { get; set; }
        public User? User { get; set; }
    }
}