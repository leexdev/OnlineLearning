using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Storage;
using server.Dtos.Lesson;
using server.Models;

namespace server.Mappers
{
    public static class LessonMappers
    {
        public static LessonDto ToLessonDto(this Lesson lessonModel)
        {
            return new LessonDto
            {
                Id = lessonModel.Id,
                Title = lessonModel.Title,
                Description = lessonModel.Description,
                isFree = lessonModel.isFree,
                ChapterId = lessonModel.ChapterId,
                Order = lessonModel.Order,
                Comments = lessonModel.Comments.Select(c => c.ToCommentDto()).ToList(),
                LessonCompletes = lessonModel.LessonCompletes.Select(c => c.ToLessonCompletedDto()).ToList(),
                Questions = lessonModel.Questions.Select(q => q.ToQuestionDto()).ToList()
            };
        }

        public static LessonDto ToLessonVideoDto(this Lesson lessonModel)
        {
            return new LessonDto
            {
                Id = lessonModel.Id,
                Title = lessonModel.Title,
                Description = lessonModel.Description,
                VideoURL = lessonModel.VideoURL,
                CourseId = lessonModel.Chapter.CourseId,
                isFree = lessonModel.isFree,
                ChapterId = lessonModel.ChapterId,
                Order = lessonModel.Order,
                Comments = lessonModel.Comments.Select(c => c.ToCommentDto()).ToList(),
                LessonCompletes = lessonModel.LessonCompletes.Select(c => c.ToLessonCompletedDto()).ToList(),
                Questions = lessonModel.Questions.Select(q => q.ToQuestionDto()).ToList()
            };
        }

        public static Lesson ToLessonFromCreate(this CreateLessonDto lessonDto)
        {
            return new Lesson
            {
                Title = lessonDto.Title,
                Description = lessonDto.Description,
                isFree = lessonDto.isFree,
                ChapterId = lessonDto.ChapterId
            };
        }

        public static List<Lesson> ToLessonOrder(this List<LessonOrder> lessonDtos)
        {
            return lessonDtos.Select(lessonDto => new Lesson
            {
                Id = lessonDto.Id,
                ChapterId = lessonDto.ChapterId,
                Order = lessonDto.Order
            }).ToList();
        }

        public static Lesson ToLessonFromUpdate(this UpdateLessonDto lessonDto)
        {
            return new Lesson
            {
                Title = lessonDto.Title,
                isFree = lessonDto.isFree,
                ChapterId = lessonDto.ChapterId
            };
        }
    }
}