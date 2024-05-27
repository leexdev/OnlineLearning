using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Dtos.Rating
{
    public class RatingDto
    {
        public int Id { get; set; }
        public string? UserId { get; set; }
        public int CourseId { get; set; }
        public int Score { get; set; }
    }
}