using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Dtos.UserAnswerHistory;
using server.Models;

namespace server.Interfaces
{
    public interface IUserAnswerHistoryRepository
    {
        Task<List<UserAnswerHistory>> GetAllAsync();
        Task<UserAnswerHistory> AddAsync(UserAnswerHistory userAnswerHistory);
        Task<UserLastAnswerResultDto> GetUserLastAnswerAsync(string userId, int questionId);
        Task<Dictionary<int, bool>> GetLastCorrectAnswersAsync(string userId);
    }
}