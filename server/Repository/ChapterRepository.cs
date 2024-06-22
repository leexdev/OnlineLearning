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
            return await _context.Chapters.AnyAsync(c => c.Id == id);
        }

        public async Task<Chapter> CreateAsync(Chapter chapterModel)
        {
            var maxOrder = await _context.Chapters
                .Where(c => c.CourseId == chapterModel.CourseId)
                .MaxAsync(c => (int?)c.Order) ?? 0;

            chapterModel.Order = maxOrder + 1;
            await _context.Chapters.AddAsync(chapterModel);
            await _context.SaveChangesAsync();
            return chapterModel;
        }

        public async Task UpdateChapterOrderAsync(int courseId, List<Chapter> chapters)
        {
            var existingChapters = await _context.Chapters.Where(c => c.CourseId == courseId).ToListAsync();

            foreach (var chapter in chapters)
            {
                var existingChapter = existingChapters.FirstOrDefault(c => c.Id == chapter.Id);
                if (existingChapter != null)
                {
                    existingChapter.Order = chapter.Order;
                }
            }

            await _context.SaveChangesAsync();
        }

        public async Task<Chapter?> DeleteAsync(int id)
        {
            var chapter = await _context.Chapters.FirstOrDefaultAsync(c => c.Id == id);
            if (chapter == null)
            {
                return null;
            }

            _context.Chapters.Remove(chapter);
            await _context.SaveChangesAsync();
            return chapter;
        }

        public async Task<List<Chapter>> GetAllAsync()
        {
            return await _context.Chapters.Include(c => c.Lessons.OrderBy(l => l.Order)).ToListAsync();
        }

        public async Task<Chapter?> GetByIdAsync(int id)
        {
            var chapter = await _context.Chapters.Include(c => c.Lessons.OrderBy(l => l.Order)).FirstOrDefaultAsync(c => c.Id == id);
            if (chapter == null)
            {
                return null;
            }

            return chapter;
        }

        public async Task<Chapter?> UpdateAsync(int id, Chapter chapterModel)
        {
            var chapter = await _context.Chapters.FirstOrDefaultAsync(c => c.Id == id);
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