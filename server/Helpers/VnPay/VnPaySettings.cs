using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Helpers
{
    public class VnPaySettings
    {
        public string TmnCode { get; set; }
        public string HashSecret { get; set; }
        public string VnpUrl { get; set; }
        public string ReturnUrl { get; set; }
    }
}