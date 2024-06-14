using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Dtos.Subject;
using server.Interfaces;
using server.Models;

namespace server.Repository
{
    public class SubjectRepository : ISubjectRepository
    {
        private readonly ApplicationDbContext _context;
        public SubjectRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Subject?> CreateAsync(Subject subjectModel)
        {
            await _context.Subjects.AddAsync(subjectModel);
            await _context.SaveChangesAsync();
            var gradeName = await _context.Grades
                .Where(g => g.Id == subjectModel.GradeId)
                .Select(g => g.Name)
                .FirstOrDefaultAsync();

            subjectModel.Grade = new Grade { Name = gradeName };
            return subjectModel;
        }

        public async Task<Subject?> DeleteAsync(int id)
        {
            var subject = await _context.Subjects.FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted);
            if (subject == null)
            {
                return null;
            }
            subject.IsDeleted = true;
            await _context.SaveChangesAsync();
            return subject;
        }

        public async Task<List<Subject>> GetAllAsync()
        {
            return await _context.Subjects.Include(x => x.Grade).Where(x => !x.IsDeleted).ToListAsync();
        }

        public async Task<Subject?> GetByIdAsync(int id)
        {
            var subject = await _context.Subjects.Include(x => x.Courses.Where(s => !s.IsDeleted)).FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted);
            if (subject == null)
            {
                return null;
            }

            return subject;
        }

        public Task<bool> SubjectExists(int id)
        {
            return _context.Subjects.AnyAsync(x => x.Id == id && !x.IsDeleted);
        }

        public async Task<Subject?> UpdateAsync(int id, Subject subjectModel)
        {
            var subject = await _context.Subjects
                .Include(s => s.Grade)
                .FirstOrDefaultAsync(s => s.Id == id && !s.IsDeleted);

            if (subject == null)
            {
                return null;
            }

            subject.Name = subjectModel.Name;
            subject.GradeId = subjectModel.GradeId;

            await _context.SaveChangesAsync();

            var gradeName = await _context.Grades
                .Where(g => g.Id == subjectModel.GradeId)
                .Select(g => g.Name)
                .FirstOrDefaultAsync();

            subject.Grade = new Grade { Name = gradeName };

            return subject;
        }

    }
}