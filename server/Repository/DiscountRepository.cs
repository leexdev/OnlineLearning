using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Interfaces;
using server.Models;

namespace server.Repository
{
    public class DiscountRepository : IDiscountRepository
    {
        private readonly ApplicationDbContext _context;
        public DiscountRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public Task<Discount> CreateAsync(Discount discountModel)
        {
            throw new NotImplementedException();
        }

        public Task<Discount?> DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> DiscountExists(int id)
        {
            return await _context.Discounts.Where(x => !x.IsDeleted).AnyAsync(x => x.Id == id);
        }

        public async Task<List<Discount>> GetAllAsync()
        {
            return await _context.Discounts.Where(d => !d.IsDeleted).ToListAsync();
        }

        public Task<Discount?> GetByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<Discount?> UpdateAsync(int id, Discount discountModel)
        {
            throw new NotImplementedException();
        }
    }
}