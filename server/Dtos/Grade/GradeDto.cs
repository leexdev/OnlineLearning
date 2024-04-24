using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Dtos.Subject;

namespace server.Dtos.Group
{
    public class GradeDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public List<SubjectDto> Subjects {get; set;} = new List<SubjectDto>();
    }
}