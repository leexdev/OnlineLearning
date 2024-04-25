using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Dtos.Subject;
using server.Models;

namespace server.Mappers
{
    public static class SubjectMappers
    {
        public static SubjectDto ToSubjectDto(this Subject subjectModel)
        {
            return new SubjectDto
            {
                Id = subjectModel.Id,
                Name = subjectModel.Name,
                GradeId = subjectModel.GradeId,
                Courses = subjectModel.Courses.Select(c => c.ToCourceDto()).ToList()
            };
        }

        public static Subject ToSubjectFromCreate(this CreateSubjectDto subjectDto, int gradeId)
        {
            return new Subject
            {
                Name = subjectDto.Name,
                GradeId = gradeId
            };
        }

        public static Subject ToSubjectFromUpdate(this UpdateSubjectDto subjectDto)
        {
            return new Subject
            {
                Name = subjectDto.Name
            };
        }
    }
}