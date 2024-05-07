using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using Microsoft.AspNetCore.DataProtection.XmlEncryption;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using server.Data;
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

        public async Task<Course> CreateAsync(Course courseModel)
        {
            await _context.Courses.AddAsync(courseModel);
            await _context.SaveChangesAsync();
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

        public async Task<List<Course>> GetAllAsync()
        {
            return await _context.Courses.Where(x => !x.IsDeleted).ToListAsync();
        }

        public async Task<Course?> GetByIdAsync(int id)
        {
            var course = await _context.Courses.FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted);
            if (course == null)
            {
                return null;
            }
            return course;
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
            course.NewPrice = courseModel.NewPrice;
            course.ImageUrl = courseModel.ImageUrl;
            course.SubjectId = courseModel.SubjectId;
            course.DiscountId = courseModel.DiscountId;

            await _context.SaveChangesAsync();
            return course;
        }
    }
}