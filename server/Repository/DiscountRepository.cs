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

        public async Task<Discount> CreateAsync(Discount discountModel)
        {
            await _context.Discounts.AddAsync(discountModel);
            await _context.SaveChangesAsync();
            return discountModel;
        }

        public async Task<Discount?> DeleteAsync(int id)
        {
            var discount = await _context.Discounts.FirstOrDefaultAsync(d => d.Id == id);
            if (discount == null)
            {
                return null;
            }

            _context.Discounts.Remove(discount);
            await _context.SaveChangesAsync();
            return discount;
        }

        public async Task<bool> DiscountExists(int id)
        {
            return await _context.Discounts.Where(x => !x.IsDeleted).AnyAsync(x => x.Id == id);
        }

        public async Task<List<Discount>> GetAllAsync()
        {
            return await _context.Discounts.Where(d => !d.IsDeleted).ToListAsync();
        }

        public async Task<Discount?> GetByIdAsync(int id)
        {
            var discount = await _context.Discounts.FirstOrDefaultAsync(d => d.Id == id);
            if (discount == null)
            {
                return null;
            }

            return discount;
        }
    }
}