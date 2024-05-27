using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Interfaces;
using server.Mappers;
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

        public async Task<Rating?> CreateAsync(string userId, Rating ratingModel)
        {
            if (!await RatingExist(ratingModel.CourseId, userId))
            {
                _context.Ratings.Add(ratingModel);
            }
            else
            {
                var existingRating = await _context.Ratings.FirstOrDefaultAsync(r => r.UserId == userId && r.CourseId == ratingModel.CourseId);
                if (existingRating == null)
                {
                    return null;
                }
                existingRating.Score = ratingModel.Score;
            }

            await _context.SaveChangesAsync();
            return ratingModel;
        }

        public async Task<bool> RatingExist(int courseId, string userId)
        {
            return await _context.Ratings.AnyAsync(r => r.CourseId == courseId && r.UserId == userId);
        }
    }
}