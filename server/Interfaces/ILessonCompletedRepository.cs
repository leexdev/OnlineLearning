using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Models;

namespace server.Interfaces
{
    public interface ILessonCompletedRepository
    {
        Task<List<LessonCompleted>> GetAllAsync();
        Task<List<LessonCompleted>> GetByUserIdAsync(string userId);
        Task<LessonCompleted> CreateAsync(LessonCompleted lessonComplete);
    }
}