using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Dtos.Question;
using server.Models;

namespace server.Interfaces
{
    public interface IQuestionRepository
    {
        Task<List<Question>> GetAllAsync();
        Task<Question?> GetByIdAsync(int id);
        Task<List<Question>> GetByCourseIdAsync(int courseId);
        Task<List<Question>> GetByLessonId(int lessonId);
        Task<Question> AddQuestionWithAnswers(Question questionModel);
        Task<Question> UpdateQuestionWithAnswers(int id, Question questionModel);
        Task<Question?> DeleteAsync(int id);
        Task<bool> QuestionExists(int id);

    }
}