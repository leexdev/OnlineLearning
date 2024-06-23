using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Google.Api;
using server.Models;

namespace server.Interfaces
{
    public interface IAdviseRepository
    {
        Task<List<Advise>> GetAllAsync();
        Task<List<Advise>> GetAdvisesByTeacherAsync(string teacherId);
        Task<List<Advise>> GetByCourseId(int courseId);
        Task<Advise?> GetById(int id);
        Task<Advise?> UpdateAsync(int id, Advise adviseModel);
        Task<Advise> CreateAsync(Advise adviseModel);
        Task<Advise?> DeleteAsync(int id);
    }
}