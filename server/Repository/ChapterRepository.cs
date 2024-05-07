using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Data;
using server.Interfaces;
using server.Models;

namespace server.Repository
{
    public class ChapterRepository : IChapterRepository
    {
        private readonly ApplicationDbContext _context;
        public ChapterRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public Task<Chapter?> CreateAsync(int courseId, Chapter chapterModel)
        {
            throw new NotImplementedException();
        }

        public Task<Chapter?> DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<List<Chapter>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Chapter?> GetByIdAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Chapter?> UpdateAsync(int id, Chapter chapterModel)
        {
            throw new NotImplementedException();
        }
    }
}