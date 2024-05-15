using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Models;

namespace server.Interfaces
{
    public interface IAnswerRepository
    {
        Task<List<Answer>> GetAllAsync();
        Task<Answer?> GetByIdAsync(int id);
        Task<Answer> CreateAsync(Answer answerModel);
        Task<Answer?> UpdateAsync(int id, Answer answerModel);
        Task<Answer?> DeleteAsync(int id);
    }
}