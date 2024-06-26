using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Dtos.UserAnswerHistory;
using server.Models;

namespace server.Mappers
{
    public static class UserAnswerHistoryMappers
    {
        public static UserAnswerHistoryDto ToUserAnswerDto(this UserAnswerHistory userAnswer)
        {
            return new UserAnswerHistoryDto
            {
                Id = userAnswer.Id,
                UserId = userAnswer.UserId,
                QuestionId = userAnswer.QuestionId,
                IsCorrect = userAnswer.IsCorrect,
                CreatedAt = userAnswer.CreatedAt,
                LessonId = userAnswer.Question.Lesson.Id,
                LessonTitle = userAnswer.Question.Lesson.Title,
                QuestionContent = userAnswer.Question.Content
            };
        }

        public static UserAnswerHistory ToUserAnswerHistoryFromCreate(this CreateUserAnswerHistoryDto dto, string userId)
        {
            return new UserAnswerHistory
            {
                UserId = userId,
                QuestionId = dto.QuestionId,
                IsCorrect = dto.IsCorrect,
                Accuracy = dto.Accuracy
            };
        }
    }
}