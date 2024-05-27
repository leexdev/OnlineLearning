using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Dtos.User
{
    public class UpdateUserDto
    {
        public string? Name { get; set; }
        public string PhoneNumber { get; set; } = string.Empty;
        public DateTime? BirthDay { get; set; }
        public string? Sex { get; set; }
    }
}