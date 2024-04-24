using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class New : BaseModel
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Content = string.Empty;
        public string ImageUrl = string.Empty;
        public int? GradeId { get; set; }
        public Grade? Grade { get; set; }
    }
}