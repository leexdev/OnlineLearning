using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Dtos.Course
{
    public class CourseDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int? OldPrice { get; set; }
        public int NewPrice { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public int SubjectId { get; set; }
        public int? DiscountId { get; set; }
    }
}