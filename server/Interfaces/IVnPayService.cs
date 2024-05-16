using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Helpers;

namespace server.Interfaces
{
    public interface IVnPayService
    {
        Task<string> GeneratePaymentUrlAsync(PaymentRequest request);
        Task<PaymentResponse> ProcessPaymentResponseAsync(HttpContext httpContext);
    }
}