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
    public class AdviseRepository : IAdviseRepository
    {
        private readonly ApplicationDbContext _context;
        public AdviseRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Advise> CreateAsync(Advise adviseModel)
        {
            await _context.Advises.AddAsync(adviseModel);
            await _context.SaveChangesAsync();
            return adviseModel;
        }

        public async Task<Advise?> DeleteAsync(int id)
        {
            var advise = await _context.Advises.FirstOrDefaultAsync(a => a.Id == id);
            if (advise == null)
            {
                return null;
            }

            _context.Advises.Remove(advise);
            await _context.SaveChangesAsync();
            return advise;
        }

        public async Task<List<Advise>> GetAllAsync()
        {
            return await _context.Advises.ToListAsync();
        }

        public async Task<List<Advise>> GetAdvisesByTeacherAsync(string teacherId)
        {
            return await _context.Advises
                .Include(a => a.Course)
                .ThenInclude(c => c.UserCourses)
                .Where(a => a.Course.UserCourses.Any(uc => uc.UserId == teacherId && uc.IsTeacher))
                .OrderByDescending(a => a.CreatedAt)
                .ToListAsync();
        }

        public async Task<List<Advise>> GetByCourseId(int courseId)
        {
            return await _context.Advises.Where(a => a.courseId == courseId).ToListAsync();
        }

        public async Task<Advise?> GetById(int id)
        {
            var advise = await _context.Advises.FirstOrDefaultAsync(a => a.Id == id);
            if (advise == null)
            {
                return null;
            }
            return advise;
        }

        public async Task<Advise?> UpdateAsync(int id, Advise adviseModel)
        {
            var advise = await _context.Advises.FirstOrDefaultAsync(a => a.Id == id);
            if (advise == null)
            {
                return null;
            }

            advise.Status = adviseModel.Status;
            await _context.SaveChangesAsync();
            return advise;
        }
    }
}