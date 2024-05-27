using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Channels;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
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

        public async Task<bool> ChapterExist(int id)
        {
            return await _context.Chapters.Where(c => !c.IsDeleted).AnyAsync(c => c.Id == id);
        }

        public async Task<Chapter?> CreateAsync(Chapter chapterModel)
        {
            await _context.Chapters.AddAsync(chapterModel);
            await _context.SaveChangesAsync();
            return chapterModel;
        }

        public async Task<Chapter?> DeleteAsync(int id)
        {
            var chapter = await _context.Chapters.FirstOrDefaultAsync(c => c.Id == id & !c.IsDeleted);
            if (chapter == null)
            {
                return null;
            }

            chapter.IsDeleted = true;
            await _context.SaveChangesAsync();
            return chapter;
        }

        public async Task<List<Chapter>> GetAllAsync()
        {
            return await _context.Chapters.Where(c => !c.IsDeleted).Include(c => c.Lessons.Where(l => !l.IsDeleted).OrderBy(l => l.Order)).ToListAsync();
        }

        public async Task<Chapter?> GetByIdAsync(int id)
        {
            var chapter = await _context.Chapters.Include(c => c.Lessons.Where(l => !l.IsDeleted).OrderBy(l => l.Order)).FirstOrDefaultAsync(c => c.Id == id & !c.IsDeleted);
            if (chapter == null)
            {
                return null;
            }

            return chapter;
        }

        public async Task<Chapter?> UpdateAsync(int id, Chapter chapterModel)
        {
            var chapter = await _context.Chapters.FirstOrDefaultAsync(c => c.Id == id & !c.IsDeleted);
            if (chapter == null)
            {
                return null;
            }

            chapter.Name = chapterModel.Name;
            chapter.CourseId = chapterModel.CourseId;

            await _context.SaveChangesAsync();
            return chapter;
        }
    }
}