using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Dtos.User
{
    public class NewUserDto
    {
        public string? Email { get; set; }
        public string Token { get; set; }
    }
}