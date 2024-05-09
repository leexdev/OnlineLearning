using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Dtos.Course;

namespace server.Dtos.Discount
{
    public class DiscountDto
    {
        public int Id { get; set; }
        public int DiscountAmount { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool IsDeleted { get; set; } = false;
        public List<CourseDto> Courses { get; set; } = new List<CourseDto>();
    }
}