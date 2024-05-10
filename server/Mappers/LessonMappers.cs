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
                VideoURL = lessonModel.VideoURL,
                isFree = lessonModel.isFree,
                ChapterId = lessonModel.ChapterId
            };
        }

        public static Lesson ToLessonFromCreate(this CreateLessonDto lessonDto)
        {
            return new Lesson
            {
                Title = lessonDto.Title,
                VideoURL = lessonDto.VideoURL,
                isFree = lessonDto.isFree,
                ChapterId = lessonDto.ChapterId
            };
        }

        public static Lesson ToLessonFromUpdate(this UpdateLessonDto lessonDto)
        {
            return new Lesson
            {
                Title = lessonDto.Title,
                VideoURL = lessonDto.VideoURL,
                isFree = lessonDto.isFree,
                ChapterId = lessonDto.ChapterId
            };
        }
    }
}