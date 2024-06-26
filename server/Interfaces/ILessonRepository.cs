using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Models;

namespace server.Interfaces
{
    public interface ILessonRepository
    {
        Task<List<Lesson>> GetAllAsync();
        Task<Lesson?> GetByIdAsync(int id);
        Task<List<Lesson>> GetByCourseIdAsync(int courseId);
        Task<Lesson> CreateAsync(Lesson lessonModel);
        Task UpdateLessonOrderAsync(int chapterId, List<Lesson> lessons);
        Task<Lesson?> UpdateAsync(int id, Lesson lessonModel);
        Task<Lesson?> UpdateVideo(int id, string videoUrl);
        Task<Lesson?> DeleteAsync(int id);
        Task<bool> LessonExists(int id);
    }
}