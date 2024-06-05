using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Dtos.Question;
using server.Models;

namespace server.Mappers
{
    public static class QuestionMappers
    {
        public static QuestionDto ToQuestionDto(this Question questionModel)
        {
            return new QuestionDto
            {
                Id = questionModel.Id,
                Content = questionModel.Content,
                LessonId = questionModel.LessonId,
                Explanation = questionModel.Explanation,
                Answers = questionModel.Answers.Select(a => a.ToAnswerDto()).ToList(),
            };
        }

        public static Question ToQuestionFromCreate(this CreateQuestionDto questionDto)
        {
            return new Question
            {
                Content = questionDto.Content,
                LessonId = questionDto.LessonId,
                Explanation = questionDto.Explanation
            };
        }

        public static Question ToQuestionFromUpdate(this UpdateQuestionDto questionDto)
        {
            return new Question
            {
                Content = questionDto.Content,
                LessonId = questionDto.LessonId
            };
        }
    }
}