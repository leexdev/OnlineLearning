using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace server.Dtos.Answer
{
    public class UpdateAnswerDto
    {
        public string Content { get; set; } = string.Empty;
        public bool IsCorrect { get; set; } = false;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}