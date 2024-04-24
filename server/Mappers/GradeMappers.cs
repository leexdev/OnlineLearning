using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using server.Dtos.Grade;
using server.Dtos.Group;
using server.Models;

namespace server.Mappers
{
    public static class GradeMapper
    {
        public static GradeDto ToGradeDto(this Grade gradeModel)
        {
            return new GradeDto
            {
                Id = gradeModel.Id,
                Name = gradeModel.Name,
                Subjects = gradeModel.Subjects.Select(s => s.ToSubjectDto()).ToList()
            };
        }

        public static Grade ToGradeFromCreate(this CreateGradeDto gradeDto){
            return new Grade {
                Name = gradeDto.Name
            };
        }

        public static Grade ToGradeFromUpdate(this UpdateGradeDto gradeDto){
            return new Grade {
                Name = gradeDto.Name
            };
        }
    }
}