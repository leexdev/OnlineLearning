using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Models;

namespace server.Interfaces
{
    public interface ICourseRepository
    {
        Task<List<Course>> GetAllAsync();
        Task<List<Course>> GetBySubjectId(int subjectId);
        Task<Course?> GetByIdAsync(int id);
        Task<Course> CreateAsync(Course courseModel);
        Task<Course?> UpdateAsync(int id, Course courseModel);
        Task<Course?> DeleteAsync(int id);
        Task<Course?> ApplyDiscountAsync(int id, int discountId);
        Task<bool> CourseExists(int id);
        Task<Course?> GetCourseWithoutChildrenAsync(int id);

    }
}