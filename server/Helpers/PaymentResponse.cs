using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Helpers
{
    public class PaymentResponse
    {
        public string Vnp_TxnRef { get; set; }
        public long Vnp_Amount { get; set; }
        public string Vnp_OrderInfo { get; set; }
        public string Vnp_ResponseCode { get; set; }
        public string Vnp_TransactionNo { get; set; }
        public Guid PaymentId { get; set; }
    }
}