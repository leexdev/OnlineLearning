using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Dtos.Course;
using server.Models;

namespace server.Mappers
{
    public static class CourseMappers
    {
        public static CourseDto ToCourseDto(this Course courseModel)
        {
            return new CourseDto
            {
                Id = courseModel.Id,
                Name = courseModel.Name,
                Title = courseModel.Title,
                Description = courseModel.Description,
                Price = courseModel.Price,
                NewPrice = courseModel.NewPrice,
                ImageUrl = courseModel.ImageUrl,
                SubjectId = courseModel.SubjectId,
                DiscountId = courseModel.DiscountId
            };
        }

        public static Course ToCourseFromCreate(this CreateCourseDto courseDto, int subjectId)
        {
            return new Course
            {
                Name = courseDto.Name,
                Title = courseDto.Title,
                Description = courseDto.Description,
                NewPrice = courseDto.Price,
                ImageUrl = courseDto.ImageUrl,
                SubjectId = subjectId
            };
        }

        public static Course ToCourseFromUpdate(this UpdateCourseDto courseDto)
        {
            return new Course
            {
                Name = courseDto.Name,
                Title = courseDto.Title,
                Description = courseDto.Description,
                Price = courseDto.Price,
                ImageUrl = courseDto.ImageUrl,
                SubjectId = courseDto.SubjectId
            };
        }
    }
}