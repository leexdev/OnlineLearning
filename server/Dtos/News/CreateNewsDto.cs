using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Dtos.New
{
    public class CreateNewsDto
    {
        public string Title { get; set; } = string.Empty;
        public string Content = string.Empty;
        public string ImageUrl = string.Empty;
        public int GradeId { get; set; }
    }
}