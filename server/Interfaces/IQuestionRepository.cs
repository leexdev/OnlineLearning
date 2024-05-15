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
        Task<Question> CreateAsync(Question questionModel);
        Task<Question?> UpdateAsync(int id, Question questionModel);
        Task<Question?> DeleAsync(int id);
        Task<bool> QuestionExists(int id);

    }
}