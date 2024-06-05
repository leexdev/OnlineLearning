using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Models;

namespace server.Interfaces
{
    public interface IQuestionRepository
    {
        Task<List<Question>> GetAllAsync();
        Task<Question?> GetByIdAsync(int id);
        Task<List<Question>> GetByLessonId(int lessonId);
        Task<Question> CreateAsync(Question questionModel);
        Task<Question?> UpdateAsync(int id, Question questionModel);
        Task<Question?> DeleteAsync(int id);
        Task<bool> QuestionExists(int id);

    }
}