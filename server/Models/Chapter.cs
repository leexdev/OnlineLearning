using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    [Table("Chapters")]
    public class Chapter : BaseModel
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int CourseId { get; set; }
        public int? Order { get; set; }
        public Course? Course { get; set; }
        public List<Lesson> Lessons { get; set; } = new List<Lesson>();
    }
}