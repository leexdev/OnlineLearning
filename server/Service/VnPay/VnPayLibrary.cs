using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace server.Service.VnPay
{
    public class VnPayLibrary
    {
        private SortedList<string, string> _requestData;
        private SortedList<string, string> _responseData = new SortedList<string, string>();

        public VnPayLibrary()
        {
            _requestData = new SortedList<string, string>();
        }

        public void AddRequestData(string key, string value)
        {
            if (!string.IsNullOrEmpty(value))
            {
                if (_requestData.ContainsKey(key))
                {
                    _requestData[key] = value;
                }
                else
                {
                    _requestData.Add(key, value);
                }
            }
        }

        public void AddResponseData(string key, string value)
        {
            if (!string.IsNullOrEmpty(value))
            {
                _responseData.Add(key, value);
            }
        }

        public string CreateRequestUrl(string baseUrl, string hashSecret)
        {
            var data = string.Join("&", _requestData.Select(kvp => $"{kvp.Key}={Uri.EscapeDataString(kvp.Value)}"));
            using (var hmac = new HMACSHA512(Encoding.UTF8.GetBytes(hashSecret)))
            {
                var hashBytes = hmac.ComputeHash(Encoding.UTF8.GetBytes(data));
                var secureHash = BitConverter.ToString(hashBytes).Replace("-", "").ToLowerInvariant();

                var url = $"{baseUrl}?{data}&vnp_SecureHash={secureHash}";
                return url;
            }
        }

        public string GetResponseData(string key)
        {
            return _responseData.TryGetValue(key, out var value) ? value : null;
        }

        public bool ValidateSignature(string secureHash, string hashSecret)
        {
            var data = string.Join("&", _responseData.Where(kvp => kvp.Key != "vnp_SecureHash").Select(kvp => $"{kvp.Key}={Uri.EscapeDataString(kvp.Value)}"));
            using (var hmac = new HMACSHA512(Encoding.UTF8.GetBytes(hashSecret)))
            {
                var checkHashBytes = hmac.ComputeHash(Encoding.UTF8.GetBytes(data));
                var checkHash = BitConverter.ToString(checkHashBytes).Replace("-", "").ToLowerInvariant();
                return checkHash == secureHash;
            }
        }
    }

}