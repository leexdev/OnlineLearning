using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Dtos.Course;
using server.Interfaces;
using server.Models;

namespace server.Repository
{
    public class UserCourseRepository : IUserCourseRepository
    {
        private readonly ApplicationDbContext _context;

        public UserCourseRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<List<CourseDto>> GetUserCourses(User user)
        {
            return await _context.UserCourses
                .Where(uc => uc.UserId == user.Id)
                .Select(uc => new CourseDto
                {
                    Id = uc.Course.Id,
                    Name = uc.Course.Name,
                    Title = uc.Course.Title,
                    Description = uc.Course.Description,
                    Price = uc.Course.Price,
                    NewPrice = uc.Course.NewPrice,
                    ImageUrl = uc.Course.ImageUrl,
                    SubjectId = uc.Course.SubjectId,
                }).ToListAsync();
        }
    }
}