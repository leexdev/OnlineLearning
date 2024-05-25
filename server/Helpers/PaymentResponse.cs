using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Helpers
{
    public class PaymentResponse
    {
        public Guid PaymentId { get; set; }
        public string Vnp_TransactionNo { get; set; }
        public string Vnp_ResponseCode { get; set; }
    }
}