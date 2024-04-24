using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Dtos.Subject;
using server.Models;

namespace server.Interfaces
{
    public interface ISubjectRepository
    {
        Task<List<Subject>> GetAllAsync();
        Task<Subject?> GetByIdAsync(int id);
        Task<Subject?> CreateAsync(Subject subject);
        Task<Subject?> UpdateAsync(int id, Subject subject);
        Task<Subject?> DeleteAsync(int id);
    }
}