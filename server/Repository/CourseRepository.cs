using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using Microsoft.AspNetCore.DataProtection.XmlEncryption;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using server.Data;
using server.Helpers;
using server.Interfaces;
using server.Models;

namespace server.Repository
{
    public class CourseRepository : ICourseRepository
    {
        private readonly ApplicationDbContext _context;
        public CourseRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> CourseExists(int id)
        {
            return await _context.Courses.Where(c => !c.IsDeleted).AnyAsync(c => c.Id == id);
        }

        public async Task<Course> CreateAsync(Course courseModel)
        {
            await _context.Courses.AddAsync(courseModel);
            await _context.SaveChangesAsync();

            var subject = await _context.Subjects.FindAsync(courseModel.SubjectId);
            courseModel.Subject = subject;

            return courseModel;
        }

        public async Task<Course?> DeleteAsync(int id)
        {
            var course = await _context.Courses.FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted);
            if (course == null)
            {
                return null;
            }
            course.IsDeleted = true;
            await _context.SaveChangesAsync();
            return course;
        }

        public async Task<(List<Course> Courses, int TotalRecords)> GetPageAsync(QueryObject queryObject)
        {
            var query = _context.Courses.Where(x => !x.IsDeleted);

            if (!string.IsNullOrEmpty(queryObject.SearchTerm))
            {
                query = query.Where(x => x.Name.Contains(queryObject.SearchTerm));
            }

            var totalRecords = await query.CountAsync();
            var courses = await query
                .OrderByDescending(c => c.CreatedAt)
                .Skip((queryObject.Page - 1) * queryObject.PageSize)
                .Take(queryObject.PageSize)
                .ToListAsync();

            return (courses, totalRecords);
        }

        public async Task<List<Course>> GetBySubjectName(string subjectName)
        {
            return await _context.Courses.Include(x => x.Subject).Where(x => x.Subject.Name.ToUpper() == subjectName.ToUpper() && !x.IsDeleted).OrderByDescending(c => c.CreatedAt).ToListAsync();
        }

        public async Task<Course?> GetByIdAsync(int id)
        {
            var course = await _context.Courses.Include(x => x.Chapters).ThenInclude(c => c.Lessons).FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted);
            if (course == null)
            {
                return null;
            }
            return course;
        }

        public async Task<Course?> GetAllChildren(int id)
        {
            var course = await _context.Courses.Include(c => c.Subject).Where(s => !s.IsDeleted).Include(c => c.UserCourses.Where(uc => uc.IsTeacher == true)).Include(x => x.Chapters).ThenInclude(c => c.Lessons).ThenInclude(l => l.Questions).ThenInclude(q => q.Answers).FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted);
            if (course == null)
            {
                return null;
            }
            return course;
        }


        public async Task<List<Course>> GetBySubjectId(int subjectId)
        {
            return await _context.Courses.Where(c => c.SubjectId == subjectId && !c.IsDeleted).OrderByDescending(c => c.CreatedAt).ToListAsync();
        }

        public async Task<Course?> UpdateAsync(int id, Course courseModel)
        {
            var course = await _context.Courses.FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted);
            if (course == null)
            {
                return null;
            }
            course.Name = courseModel.Name;
            course.Title = courseModel.Title;
            course.Description = courseModel.Description;
            course.Price = courseModel.Price;
            course.ImageUrl = courseModel.ImageUrl;
            course.SubjectId = courseModel.SubjectId;

            await _context.SaveChangesAsync();
            return course;
        }

        public async Task<Course?> UpdatePrice(int id, int price)
        {
            var course = await _context.Courses.FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted);
            if (course == null)
            {
                return null;
            }
            course.NewPrice = price;

            await _context.SaveChangesAsync();
            return course;
        }

        public async Task<Course?> DeleteNewPrice(int id)
        {
            var course = await _context.Courses.FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted);
            if (course == null)
            {
                return null;
            }
            course.NewPrice = null;
            await _context.SaveChangesAsync();
            return course;
        }

        public async Task<Course?> GetCourseWithoutChildrenAsync(int id)
        {
            return await _context.Courses.FirstOrDefaultAsync(c => c.Id == id && !c.IsDeleted);
        }

        public async Task<List<Course>> GetAllAsync(DateTime? startDate, DateTime? endDate)
        {
            var query = _context.Courses.Where(c => !c.IsDeleted).AsQueryable();

            if (startDate.HasValue)
            {
                query = query.Where(c => c.CreatedAt >= startDate.Value);
            }

            if (endDate.HasValue)
            {
                query = query.Where(c => c.CreatedAt <= endDate.Value);
            }

            return await query.ToListAsync();
        }

    }
}