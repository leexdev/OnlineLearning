using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Dtos.LessonCompleted;
using server.Models;

namespace server.Mappers
{
    public static class LessonCompletedMappers
    {
        public static LessonCompletedDto ToLessonCompletedDto(this LessonCompleted lessonCompletedModel)
        {
            return new LessonCompletedDto
            {
                Id = lessonCompletedModel.Id,
                LessonId = lessonCompletedModel.LessonId,
                UserId = lessonCompletedModel.UserId
            };
        }

        public static LessonCompleted ToLessonCompletedFromCreate(this CreateLessonCompletedDto lessonCompletedDto, string userId)
        {
            return new LessonCompleted
            {
                LessonId = lessonCompletedDto.LessonId,
                UserId = userId
            };
        }
    }
}