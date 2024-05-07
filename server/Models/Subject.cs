using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace server.Models
{
    [Table("Subjects")]
    public class Subject : BaseModel
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int GradeId { get; set; }
        public bool IsDeleted { get; set; } = false;
        public Grade? Grade { get; set; }
        public List<Course> Courses { get; set; } = new List<Course>();
    }
}