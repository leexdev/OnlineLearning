using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Dtos.Advise
{
    public class UpdateAdviseDto
    {
        public string? Status { get; set; }
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}