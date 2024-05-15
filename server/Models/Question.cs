using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    [Table("Questions")]
    public class Question : BaseModel
    {
        public int Id { get; set; }
        public string Content { get; set; } = string.Empty;
        public int LessonId { get; set; }
        public Lesson? Lesson { get; set; }
        public List<Answer> Answers { get; set; } = new List<Answer>();
    }
}