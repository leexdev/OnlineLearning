using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    [Table("LessonCompletes")]
    public class LessonComplete
    {
        public int Id { get; set; }
        public string? UserId { get; set; }
        public int LessonId { get; set; }
        public Lesson? Lesson { get; set; }
        public User? User { get; set; }
    }
}