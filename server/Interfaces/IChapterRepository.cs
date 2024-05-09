using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Models;

namespace server.Interfaces
{
    public interface IChapterRepository
    {
        Task<List<Chapter>> GetAllAsync();
        Task<Chapter?> GetByIdAsync(int id);
        Task<Chapter?> CreateAsync(int courseId, Chapter chapterModel);
        Task<Chapter?> UpdateAsync(int id, Chapter chapterModel);
        Task<Chapter?> DeleteAsync(int id);
    }
}