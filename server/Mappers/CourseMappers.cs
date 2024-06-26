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
                SubjectName = courseModel.Subject?.Name,
                Chapters = courseModel.Chapters.Select(c => c.ToChapterDto()).ToList(),
                UserCourses = courseModel.UserCourses.Select(uc => uc.ToUserCourseDto()).ToList()
            };
        }

        public static CourseDto ToCourseWithVideoLessonDto(this Course courseModel)
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
                SubjectName = courseModel.Subject?.Name,
                Chapters = courseModel.Chapters.Select(c => c.ToChapterWithVideoLessonDto()).ToList(),
                UserCourses = courseModel.UserCourses.Select(uc => uc.ToUserCourseDto()).ToList()
            };
        }

        public static Course ToCourseFromCreate(this CreateCourseDto courseDto, string imageUrl)
        {
            return new Course
            {
                Name = courseDto.Name,
                Title = courseDto.Title,
                Description = courseDto.Description,
                Price = courseDto.Price,
                ImageUrl = imageUrl,
                SubjectId = courseDto.SubjectId
            };
        }

        public static Course ToCourseFromUpdate(this UpdateCourseDto courseDto, string imageUrl)
        {
            return new Course
            {
                Name = courseDto.Name,
                Title = courseDto.Title,
                Description = courseDto.Description,
                Price = courseDto.Price,
                ImageUrl = imageUrl,
                SubjectId = courseDto.SubjectId
            };
        }
    }
}