using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Helpers
{
    public class PaymentRequest
    {
        public int PaymentId { get; set; }
        public string ReturnUrl { get; set; }
        public int? Amount { get; set; }
    }
}