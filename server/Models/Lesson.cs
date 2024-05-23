using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    [Table("Lessons")]
    public class Lesson : BaseModel
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; } = string.Empty;
        public string VideoURL { get; set; } = string.Empty;
        public bool isFree { get; set; } = false;
        public int ChapterId { get; set; }
        public bool IsDeleted { get; set; } = false;
        public Chapter? Chapter { get; set; }
        public List<Question> Questions { get; set; } = new List<Question>();
        public List<Comment> Comments { get; set; } = new List<Comment>();
        public List<Rating> Ratings { get; set; } = new List<Rating>();
        public List<LessonComplete> LessonCompletes { get; set; } = new List<LessonComplete>();
    }
}