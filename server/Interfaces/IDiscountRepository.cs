using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Models;

namespace server.Interfaces
{
    public interface IDiscountRepository
    {
        Task<List<Discount>> GetAllAsync();
        Task<Discount?> GetByIdAsync(int id);
        Task<Discount> CreateAsync(Discount discountModel);
        Task<Discount?> UpdateAsync(int id, Discount discountModel);
        Task<Discount?> DeleteAsync(int id);
        Task<bool> DiscountExists(int id);
    }
}