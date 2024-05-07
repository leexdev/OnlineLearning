using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Models;

namespace server.Interfaces
{
    public interface IBannerRepository
    {
        Task<List<Banner>> GetAllAsync();
        Task<Banner?> GetByIdAsync(int id);
        Task<Banner> CreateAsync(Banner bannerModel);
        Task<Banner?> UpdateAsync(int id, Banner bannerModel);
        Task<Banner?> DeleteAsync(int id);

    }
}