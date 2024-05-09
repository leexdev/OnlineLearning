using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Dtos.Discount;
using server.Models;

namespace server.Mappers
{
    public static class DiscountMappers
    {
        public static DiscountDto ToDiscountDto(this Discount discountModel)
        {
            return new DiscountDto
            {
                Id = discountModel.Id,
                DiscountAmount = discountModel.DiscountAmount,
                StartDate = discountModel.StartDate,
                EndDate = discountModel.EndDate,
                Courses = discountModel.Courses.Select(c => c.ToCourseDto()).ToList()
            };
        }
    }
}