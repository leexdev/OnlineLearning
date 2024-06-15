using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Dtos.Rating
{
    public class UpdateRatingDto
    {
        public int Score { get; set; }
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}