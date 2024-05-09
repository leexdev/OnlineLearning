using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Dtos.Grade;
using server.Interfaces;
using server.Models;

namespace server.Repository
{
    public class GradeRepository : IGradeRepository
    {
        private readonly ApplicationDbContext _context;
        public GradeRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Grade> CreateAsync(Grade gradeModel)
        {
            await _context.Grades.AddAsync(gradeModel);
            await _context.SaveChangesAsync();
            return gradeModel;
        }

        public async Task<Grade?> DeleteAsync(int id)
        {
            var grade = await _context.Grades.FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted);
            if (grade == null)
            {
                return null;
            }

            grade.IsDeleted = true;
            await _context.SaveChangesAsync();
            return grade;
        }

        public async Task<List<Grade>> GetAllAsync()
        {
            return await _context.Grades.Where(x => !x.IsDeleted).Include(x => x.Subjects.Where(s => !s.IsDeleted)).ToListAsync();
        }

        public async Task<Grade?> GetByIdAsync(int id)
        {
            var grade = await _context.Grades.Include(x => x.Subjects.Where(s => !s.IsDeleted)).FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted);
            if (grade == null)
            {
                return null;
            }

            return grade;
        }

        public async Task<bool> GradeExists(int id)
        {
            return await _context.Grades.Where(x => !x.IsDeleted).AnyAsync(x => x.Id == id);
        }

        public async Task<Grade?> UpdateAsync(int id, Grade gradeModel)
        {
            var existingGrade = await _context.Grades.FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted);
            if (existingGrade == null)
            {
                return null;
            }
            existingGrade.Name = gradeModel.Name;
            await _context.SaveChangesAsync();
            return existingGrade;
        }
    }
}