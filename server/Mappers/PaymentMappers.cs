using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Dtos.Payment;
using server.Helpers;
using server.Models;

namespace server.Mappers
{
    public static class PaymentMappers
    {
        public static PaymentDto ToPaymentDto(this Payment paymentModel)
        {
            return new PaymentDto
            {
                Id = paymentModel.Id,
                UserName = paymentModel.User.UserName,
                CourseName = paymentModel.Course.Name,
                Amount = paymentModel.Amount,
                Status = paymentModel.Status,
                CourseId = paymentModel.Course.Id,
                CreatedAt = paymentModel.CreatedAt
            };
        }
        public static PaymentRequest ToPaymentFromRequestDto(this Payment payment, int? amount)
        {
            return new PaymentRequest
            {
                Amount = amount,
                PaymentId = payment.Id
            };
        }

        public static Payment ToPaymentFromCreate(this CreatePaymentDto paymentDto, string userId, int? amount)
        {
            return new Payment
            {
                UserId = userId,
                CourseId = paymentDto.CourseId,
                Amount = amount,
            };
        }
    }
}