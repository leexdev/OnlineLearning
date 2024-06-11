using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Dtos.Advise;
using server.Models;

namespace server.Mappers
{
    public static class AdviseMappers
    {
        public static AdviseDto ToAdviseDto(this Advise adviseModel)
        {
            return new AdviseDto
            {
                Id = adviseModel.Id,
                Name = adviseModel.Name,
                BirthDay = adviseModel.BirthDay,
                Academic = adviseModel.Academic,
                Status = adviseModel.Status,
                courseId = adviseModel.courseId,
                CreatedAt = adviseModel.CreatedAt
            };
        }

        public static Advise ToAdviseFromCreate(this CreateAdviseDo adviseDto)
        {
            return new Advise
            {
                Name = adviseDto.Name,
                BirthDay = adviseDto.BirthDay,
                Academic = adviseDto.Academic,
                courseId = adviseDto.courseId,
            };
        }

        public static Advise ToAnswerFromUpdate(this UpdateAdviseDto adviseDto)
        {
            return new Advise
            {
                Status = adviseDto.Status
            };
        }
    }
}