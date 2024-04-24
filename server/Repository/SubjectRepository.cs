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
            return subjectModel;
        }

        public async Task<Subject?> DeleteAsync(int id)
        {
            var subject = await _context.Subjects.FirstOrDefaultAsync(x => x.Id == id);
            if (subject == null)
            {
                return null;
            }
            subject.IsDeleted = true;
            return subject;
        }

        public async Task<List<Subject>> GetAllAsync()
        {
            return await _context.Subjects.ToListAsync();
        }

        public async Task<Subject?> GetByIdAsync(int id)
        {
            var subject = await _context.Subjects.FindAsync(id);
            if (subject == null)
            {
                return null;
            }

            return subject;
        }
        public async Task<Subject?> UpdateAsync(int id, Subject subjectModel)
        {
            var subject = await _context.Subjects.FindAsync(id);
            if (subject == null)
            {
                return null;
            }

            subject.Name = subjectModel.Name;
            await _context.SaveChangesAsync();
            return subject;
        }
    }
}