using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Dtos.User
{
    public class UserDto
    {
        public string Id { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public DateTime? BirthDay { get; set; }
        public string? Sex { get; set; }
        public string? Avatar { get; set; }
        public IList<string> Roles { get; set; } = new List<string>();
    }
}