using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Models;

namespace server.Interfaces
{
    public interface INewsRepository
    {
        Task<List<News>> GetAllAsync();
        Task<News?> GetByIdAsync(int id);
        Task<News> CreateAsync(News newModel);
        Task<News?> UpdateAsync(int id, News newModel);
        Task<News?> DeleteAsync(int id);
    }
}