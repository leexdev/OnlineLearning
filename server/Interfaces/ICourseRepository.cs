using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Helpers;
using server.Models;

namespace server.Interfaces
{
    public interface ICourseRepository
    {
        Task<List<Course>> GetAllAsync();
        Task<(List<Course> Courses, int TotalRecords)> GetPageAsync(QueryObject queryObject);
        Task<List<Course>> GetBySubjectId(int subjectId);
        Task<List<Course>> GetBySubjectName(string subjectName);
        Task<Course?> GetByIdAsync(int id);
        Task<Course?> GetAllChildren(int id);
        Task<Course> CreateAsync(Course courseModel);
        Task<Course?> UpdateAsync(int id, Course courseModel);
        Task<Course?> UpdatePrice(int id, int price);
        Task<Course?> DeleteNewPrice(int id);
        Task<Course?> DeleteAsync(int id);
        Task<bool> CourseExists(int id);
        Task<Course?> GetCourseWithoutChildrenAsync(int id);
        Task<List<Course>> GetCoursesByTeacherAsync(string teacherId);
    }
}