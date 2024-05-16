using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using server.Helpers;
using server.Interfaces;
using server.Service.VnPay;

namespace server.Service
{
    public class VnPayService : IVnPayService
    {
        private readonly VnPaySettings _settings;

        public VnPayService(IOptions<VnPaySettings> settings)
        {
            _settings = settings.Value;
        }

        public async Task<string> GeneratePaymentUrlAsync(PaymentRequest request)
        {
            var vnPayLibrary = new VnPayLibrary();
            vnPayLibrary.AddRequestData("vnp_Version", "2.1.0");
            vnPayLibrary.AddRequestData("vnp_Command", "pay");
            vnPayLibrary.AddRequestData("vnp_TmnCode", _settings.TmnCode);
            vnPayLibrary.AddRequestData("vnp_Amount", ((long)request.Amount * 100).ToString());
            vnPayLibrary.AddRequestData("vnp_CreateDate", DateTime.Now.ToString("yyyyMMddHHmmss"));
            vnPayLibrary.AddRequestData("vnp_CurrCode", "VND");
            vnPayLibrary.AddRequestData("vnp_IpAddr", "127.0.0.1");
            vnPayLibrary.AddRequestData("vnp_Locale", "vn");
            vnPayLibrary.AddRequestData("vnp_OrderInfo", Uri.EscapeDataString("Thanh toán cho đơn hàng: " + request.PaymentId));
            vnPayLibrary.AddRequestData("vnp_OrderType", "other");
            vnPayLibrary.AddRequestData("vnp_ReturnUrl", _settings.ReturnUrl);
            vnPayLibrary.AddRequestData("vnp_TxnRef", request.PaymentId.ToString());

            var paymentUrl = vnPayLibrary.CreateRequestUrl(_settings.VnpUrl, _settings.HashSecret);
            return paymentUrl;
        }

        public async Task<PaymentResponse> ProcessPaymentResponseAsync(HttpContext httpContext)
        {
            using (var reader = new StreamReader(httpContext.Request.Body))
            {
                var requestBody = await reader.ReadToEndAsync();
                var responseData = JsonConvert.DeserializeObject<PaymentResponse>(requestBody);

                // Validate signature
                var vnPayLibrary = new VnPayLibrary();
                if (!vnPayLibrary.ValidateSignature(httpContext.Request.Query["vnp_SecureHash"], _settings.HashSecret))
                {
                    httpContext.Response.StatusCode = StatusCodes.Status400BadRequest;
                    return null;
                }
                return responseData;
            }
        }
    }
}