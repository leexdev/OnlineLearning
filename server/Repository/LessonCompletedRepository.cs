using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using server.Data;
using server.Interfaces;
using server.Models;

namespace server.Repository
{
    public class LessonCompletedRepository : ILessonCompletedRepository
    {
        private readonly ApplicationDbContext _context;
        public LessonCompletedRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<LessonCompleted> CreateAsync(LessonCompleted lessonCompleted)
        {
            await _context.LessonCompletes.AddAsync(lessonCompleted);
            await _context.SaveChangesAsync();
            return lessonCompleted;
        }

        public async Task<List<LessonCompleted>> GetAllAsync()
        {
            return await _context.LessonCompletes.ToListAsync();
        }

        public async Task<List<LessonCompleted>> GetByUserIdAsync(string userId)
        {
            return await _context.LessonCompletes.Where(l => l.UserId == userId).ToListAsync();
        }
    }
}