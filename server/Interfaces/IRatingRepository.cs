using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Models;

namespace server.Interfaces
{
    public interface IRatingRepository
    {
        Task<List<Rating>> GetAllAsync();
        Task<List<Rating>> GetByCourseIdAsync(int courseId);
        Task<Rating?> CreateAsync(string userId, Rating ratingModel);
        Task<Rating?> DeleteAsync(int id);
        Task<bool> RatingExist(int lessonId, string userId);
    }
}