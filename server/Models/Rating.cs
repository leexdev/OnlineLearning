using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class Rating : BaseModel
    {
        public int Id { get; set; }
        public int Score { get; set; }
        public int? UserId { get; set; }
        public int? LessonId { get; set; }
        public Lesson? Lesson { get; set; }
        public User? User { get; set; }
    }
}