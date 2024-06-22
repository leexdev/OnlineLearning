using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Dtos.Grade;
using server.Dtos.Group;
using server.Models;

namespace server.Interfaces
{
    public interface IGradeRepository
    {
        Task<List<Grade>> GetAllAsync();
        Task<Grade?> GetByIdAsync(int id);
        Task<Grade> CreateAsync(Grade gradeModel);
        Task<Grade?> UpdateAsync(int id, Grade gradeModel);
        Task<Grade?> DeleteAsync(int id);
        Task<bool> GradeExists(int id);
        Task<Grade> FindByNameAsync(string name);
    }
}