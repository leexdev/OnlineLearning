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
    public class BannerRepository : IBannerRepository
    {
        private readonly ApplicationDbContext _context;
        public BannerRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Banner> CreateAsync(Banner bannerModel)
        {
            await _context.Banners.AddAsync(bannerModel);
            await _context.SaveChangesAsync();
            return bannerModel;
        }

        public async Task<Banner?> DeleteAsync(int id)
        {
            var banner = await _context.Banners.FirstOrDefaultAsync(b => b.Id == id);
            if (banner == null)
            {
                return null;
            }

            _context.Banners.Remove(banner);
            await _context.SaveChangesAsync();
            return banner;
        }

        public async Task<List<Banner>> GetAllAsync()
        {
            return await _context.Banners.ToListAsync();
        }

        public async Task<Banner?> GetByIdAsync(int id)
        {
            var banner = await _context.Banners.FirstOrDefaultAsync(b => b.Id == id);
            if (banner == null)
            {
                return null;
            }
            return banner;
        }

        public async Task<Banner?> UpdateAsync(int id, Banner bannerModel)
        {
            var banner = await _context.Banners.FirstOrDefaultAsync(b => b.Id == id);
            if (banner == null)
            {
                return null;
            }

            banner.ImageUrl = bannerModel.ImageUrl;
            banner.Link = bannerModel.Link;

            await _context.SaveChangesAsync();
            return banner;
        }
    }
}