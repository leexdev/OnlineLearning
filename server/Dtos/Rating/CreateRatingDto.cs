using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Dtos.Rating
{
    public class CreateRatingDto
    {
        public int LessonId { get; set; }
        public int Score { get; set; }
    }
}