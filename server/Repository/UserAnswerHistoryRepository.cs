using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Dtos.UserAnswerHistory;
using server.Interfaces;
using server.Models;

namespace server.Repository
{
    public class UserAnswerHistoryRepository : IUserAnswerHistoryRepository
    {
        private readonly ApplicationDbContext _context;
        public UserAnswerHistoryRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<List<UserAnswerHistory>> GetAllAsync()
        {
            return await _context.UserAnswerHistories.ToListAsync();
        }
        public async Task<UserAnswerHistory> AddAsync(UserAnswerHistory userAnswerHistory)
        {
            await _context.UserAnswerHistories.AddAsync(userAnswerHistory);
            await _context.SaveChangesAsync();
            return userAnswerHistory;
        }
        public async Task<UserLastAnswerResultDto> GetUserLastAnswerAsync(string userId, int questionId)
        {
            var lastAnswer = await _context.UserAnswerHistories
                .Where(uah => uah.UserId == userId && uah.QuestionId == questionId)
                .OrderByDescending(uah => uah.CreatedAt)
                .FirstOrDefaultAsync();

            if (lastAnswer == null)
            {
                return null;
            }

            return new UserLastAnswerResultDto
            {
                IsCorrect = lastAnswer.IsCorrect
            };
        }

        public async Task<Dictionary<int, bool>> GetLastCorrectAnswersAsync(string userId)
        {
            var lastCorrectAnswers = await _context.UserAnswerHistories
                .Where(uah => uah.UserId == userId)
                .GroupBy(uah => uah.QuestionId)
                .Select(g => g.OrderByDescending(uah => uah.Id).FirstOrDefault())
                .ToDictionaryAsync(x => x.QuestionId, x => x.IsCorrect);

            return lastCorrectAnswers;
        }

        public async Task<List<UserAnswerHistory>> GetHistoryByCourseAsync(string userId, int courseId, DateTime startDate, DateTime endDate)
        {
            var history = await _context.UserAnswerHistories
                .Include(uah => uah.Question)
                .ThenInclude(q => q.Lesson)
                .ThenInclude(l => l.Chapter)
                .Where(uah => uah.UserId == userId
                           && uah.Question.Lesson.Chapter.CourseId == courseId
                           && uah.CreatedAt.Date >= startDate.Date
                           && uah.CreatedAt.Date <= endDate.Date)
                .ToListAsync();

            return history;
        }

        public async Task<List<UserAnswerHistory>> GetRecentUncorrectedWrongAnswersAsync(int courseId, string userId, int pageNumber = 1, int pageSize = 10)
        {
            var userAnswers = await _context.UserAnswerHistories
                .Include(uah => uah.Question)
                    .ThenInclude(q => q.Lesson)
                        .ThenInclude(l => l.Chapter)  // Đảm bảo chúng ta bao gồm Chapter ở đây
                .Where(uah => uah.UserId == userId && uah.Question.Lesson.Chapter.CourseId == courseId)
                .OrderBy(uah => uah.CreatedAt)
                .ToListAsync();

            var recentWrongAnswers = userAnswers
                .GroupBy(uah => uah.QuestionId)
                .Select(g =>
                {
                    var lastWrongAnswer = g.LastOrDefault(uah => !uah.IsCorrect);
                    var lastAnswer = g.LastOrDefault();

                    if (lastWrongAnswer != null && lastWrongAnswer.CreatedAt == lastAnswer.CreatedAt)
                    {
                        return lastWrongAnswer;
                    }
                    return null;
                })
                .Where(uah => uah != null)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return recentWrongAnswers;
        }
    }
}