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
                .Where(l => l.ChapterId == lessonModel.ChapterId)
                .OrderByDescending(l => l.Order)
                .Select(l => l.Order)
                .FirstOrDefault();

            lessonModel.Order = maxOrder + 1;
            await _context.Lessons.AddAsync(lessonModel);
            await _context.SaveChangesAsync();
            return lessonModel;
        }

        public async Task UpdateLessonOrderAsync(int chapterId, List<Lesson> lessons)
        {
            var existingLessons = await _context.Lessons.Where(c => c.ChapterId == chapterId).ToListAsync();

            foreach (var lesson in lessons)
            {
                var existingLesson = existingLessons.FirstOrDefault(c => c.Id == lesson.Id);
                if (existingLesson != null)
                {
                    existingLesson.Order = lesson.Order;
                }
            }

            await _context.SaveChangesAsync();
        }

        public async Task<Lesson?> DeleteAsync(int id)
        {
            var lesson = await _context.Lessons.FirstOrDefaultAsync(l => l.Id == id);
            if (lesson == null)
            {
                return null;
            }

            _context.Lessons.Remove(lesson);
            await _context.SaveChangesAsync();
            return lesson;
        }

        public async Task<List<Lesson>> GetAllAsync()
        {
            return await _context.Lessons.Include(l => l.Comments).ThenInclude(l => l.User).OrderBy(l => l.Order).ToListAsync();
        }

        public async Task<Lesson?> GetByIdAsync(int id)
        {
            var lesson = await _context.Lessons.Include(l => l.Chapter).Include(l => l.Comments.OrderByDescending(c => c.CreatedAt)).ThenInclude(l => l.User).FirstOrDefaultAsync(l => l.Id == id);
            if (lesson == null)
            {
                return null;
            }

            return lesson;
        }

        public async Task<List<Lesson>> GetByCourseIdAsync(int courseId)
        {
            var lesson = await _context.Lessons.Include(l => l.Chapter).Where(l => l.Chapter.CourseId == courseId).ToListAsync();
            if (lesson == null)
            {
                return null;
            }

            return lesson;
        }

        public async Task<bool> LessonExists(int id)
        {
            return await _context.Lessons.AnyAsync(l => l.Id == id);
        }

        public async Task<Lesson?> UpdateAsync(int id, Lesson lessonModel)
        {
            var lesson = await _context.Lessons.FirstOrDefaultAsync(l => l.Id == id);
            if (lesson == null)
            {
                return null;
            }

            lesson.Title = lessonModel.Title;
            lesson.isFree = lessonModel.isFree;
            lesson.ChapterId = lessonModel.ChapterId;
            lesson.Description = lessonModel.Description;

            await _context.SaveChangesAsync();
            return lesson;
        }

        public async Task<Lesson?> UpdateVideo(int id, string videoUrl)
        {
            var lesson = await _context.Lessons.FirstOrDefaultAsync(l => l.Id == id);
            if (lesson == null)
            {
                return null;
            }

            lesson.VideoURL = videoUrl;

            await _context.SaveChangesAsync();
            return lesson;
        }
    }
}