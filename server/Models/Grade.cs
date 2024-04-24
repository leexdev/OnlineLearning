using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class Grade : BaseModel
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public bool IsDeleted { get; set; } = false;
        public List<Subject> Subjects {get; set;} = new List<Subject>();
        public List<New> News { get; set; } = new List<New>();
    }
}