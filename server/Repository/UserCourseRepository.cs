using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
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

        public async Task<List<UserCourse>> GetAllAsync(DateTime? startDate, DateTime? endDate)
        {
            var query = _context.UserCourses.AsQueryable();

            if (startDate.HasValue)
            {
                query = query.Where(uc => uc.CreatedAt >= startDate.Value);
            }

            if (endDate.HasValue)
            {
                query = query.Where(uc => uc.CreatedAt <= endDate.Value);
            }

            return await query.ToListAsync();
        }

        public async Task<List<CourseDto>> GetUserCourses(string userId)
        {
            return await _context.UserCourses
                .Where(uc => uc.UserId == userId)
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

        public async Task<UserCourse> CreateAsync(UserCourse userCourse)
        {
            await _context.UserCourses.AddAsync(userCourse);
            await _context.SaveChangesAsync();
            return userCourse;
        }

        public async Task<List<UserCourse>> CreateTeacher(List<UserCourse> userCourses)
        {
            var courseId = userCourses.FirstOrDefault()?.CourseId;

            if (courseId == null)
            {
                throw new ArgumentException("Không tìm thấy CourseId trong danh sách UserCourse.");
            }

            var oldUserCourses = await _context.UserCourses.Where(uc => uc.CourseId == courseId).ToListAsync();
            _context.UserCourses.RemoveRange(oldUserCourses);
            await _context.SaveChangesAsync();
            var newUserCourses = new List<UserCourse>();

            foreach (var userCourse in userCourses)
            {
                if (string.IsNullOrEmpty(userCourse.UserId))
                {
                    throw new InvalidOperationException("UserId phải được thiết lập cho mỗi UserCourse.");
                }

                List<string> userIds;
                try
                {
                    userIds = JsonSerializer.Deserialize<List<string>>(userCourse.UserId);
                }
                catch (JsonException ex)
                {
                    throw new InvalidOperationException("Định dạng UserId không hợp lệ.", ex);
                }

                foreach (var id in userIds)
                {
                    var userExists = await _context.Users.AnyAsync(u => u.Id == id);
                    if (!userExists)
                    {
                        throw new InvalidOperationException($"Người dùng với ID {id} không tồn tại.");
                    }

                    var newUserCourse = new UserCourse
                    {
                        UserId = id,
                        CourseId = userCourse.CourseId,
                        IsTeacher = true
                    };

                    newUserCourses.Add(newUserCourse);
                }
            }
            await _context.UserCourses.AddRangeAsync(newUserCourses);
            await _context.SaveChangesAsync();
            return newUserCourses;
        }
    }
}
