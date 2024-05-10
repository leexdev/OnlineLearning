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
    public class RatingRepository : IRatingRepository
    {
        private readonly ApplicationDbContext _context;
        public RatingRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Rating> CreateAsync(Rating ratingModel)
        {
            await _context.Ratings.AddAsync(ratingModel);
            await _context.SaveChangesAsync();
            return ratingModel;
        }

        public async Task<Rating?> DeleteAsync(int id)
        {
            var rating = await _context.Ratings.FirstOrDefaultAsync(r => r.Id == id);
            if (rating == null)
            {
                return null;
            }

            _context.Ratings.Remove(rating);
            await _context.SaveChangesAsync();
            return rating;
        }

        public async Task<List<Rating>> GetAllAsync()
        {
            return await _context.Ratings.ToListAsync();
        }

        public async Task<Rating?> GetByIdAsync(int id)
        {
            var rating = await _context.Ratings.FirstOrDefaultAsync(r => r.Id == id);
            if (rating == null)
            {
                return null;
            }

            return rating;
        }

        public async Task<Rating?> UpdateAsync(int id, Rating ratingModel)
        {
            var rating = await _context.Ratings.FirstOrDefaultAsync(r => r.Id == id);
            if (rating == null)
            {
                return null;
            }

            rating.Score = ratingModel.Score;

            await _context.SaveChangesAsync();
            return rating;
        }
    }
}