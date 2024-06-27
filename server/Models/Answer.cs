using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    [Table("Answers")]
    public class Answer : BaseModel
    {
        public int Id { get; set; }
        public string Content { get; set; } = string.Empty;
        public bool IsCorrect { get; set; } = false;
        public int QuestionId { get; set; }
        public int Order { get; set; }
        public Question? Question { get; set; }
    }
}