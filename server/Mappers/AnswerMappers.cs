using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Dtos.Answer;
using server.Models;

namespace server.Mappers
{
    public static class AnswerMappers
    {
        public static AnswerDto ToAnswerDto(this Answer answerModel)
        {
            return new AnswerDto
            {
                Id = answerModel.Id,
                Content = answerModel.Content,
                IsCorrect = answerModel.IsCorrect,
                QuestionId = answerModel.QuestionId
            };
        }

        public static Answer ToAnswerFromCreate(this CreateAnswerDto answerDto)
        {
            return new Answer
            {
                Content = answerDto.Content,
                IsCorrect = answerDto.IsCorrect,
                QuestionId = answerDto.QuestionId
            };
        }

        public static Answer ToAnswerFromUpdate(this UpdateAnswerDto answerDto)
        {
            return new Answer
            {
                Content = answerDto.Content,
                IsCorrect = answerDto.IsCorrect,
                QuestionId = answerDto.QuestionId
            };
        }
    }
}