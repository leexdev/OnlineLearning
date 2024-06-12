using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    [Table("UserAnswerHistories")]
    public class UserAnswerHistory : BaseModel
    {
        public int Id { get; set; }
        public string UserId { get; set; } = string.Empty;
        public int QuestionId { get; set; }
        public bool IsCorrect { get; set; }
        public double Accuracy { get; set; }
        public User? User { get; set; }
        public Question? Question { get; set; }
    }
}
