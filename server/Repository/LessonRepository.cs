using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Interfaces;
using server.Models;

namespace server.Repository
{
    public class LessonRepository : ILessonRepository
    {
        private readonly ApplicationDbContext _context;
        public LessonRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Lesson> CreateAsync(Lesson lessonModel)
        {
            var maxOrder = _context.Lessons
                .Where(l => l.ChapterId == lessonModel.ChapterId && !l.IsDeleted)
                .OrderByDescending(l => l.Order)
                .Select(l => l.Order)
                .FirstOrDefault();

            lessonModel.Order = maxOrder + 1;
            await _context.Lessons.AddAsync(lessonModel);
            await _context.SaveChangesAsync();
            return lessonModel;
        }

        public async Task<Lesson?> DeleteAsync(int id)
        {
            var lesson = await _context.Lessons.FirstOrDefaultAsync(l => l.Id == id && !l.IsDeleted);
            if (lesson == null)
            {
                return null;
            }

            lesson.IsDeleted = true;
            await _context.SaveChangesAsync();
            return lesson;
        }

        public async Task<List<Lesson>> GetAllAsync()
        {
            return await _context.Lessons.Include(l => l.LessonCompletes).Include(l => l.Comments).ThenInclude(l => l.User).Where(l => !l.IsDeleted).OrderBy(l => l.Order).ToListAsync();
        }

        public async Task<Lesson?> GetByIdAsync(int id)
        {
            var lesson = await _context.Lessons.Include(l => l.LessonCompletes).Include(l => l.Comments).ThenInclude(l => l.User).FirstOrDefaultAsync(l => l.Id == id && !l.IsDeleted);
            if (lesson == null)
            {
                return null;
            }

            return lesson;
        }

        public async Task<bool> LessonExists(int id)
        {
            return await _context.Lessons.Where(l => !l.IsDeleted).AnyAsync(l => l.Id == id);
        }

        public async Task<Lesson?> UpdateAsync(int id, Lesson lessonModel)
        {
            var lesson = await _context.Lessons.FirstOrDefaultAsync(l => l.Id == id && !l.IsDeleted);
            if (lesson == null)
            {
                return null;
            }

            lesson.Title = lessonModel.Title;
            lesson.VideoURL = lessonModel.VideoURL;
            lesson.isFree = lessonModel.isFree;
            lesson.ChapterId = lessonModel.ChapterId;

            await _context.SaveChangesAsync();
            return lesson;
        }
    }
}