using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Dtos.Subject
{
    public class CreateSubjectDto
    {
        public string Name { get; set; } = string.Empty;
        public int GradeId { get; set; }
    }
}