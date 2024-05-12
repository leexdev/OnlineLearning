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
    public class NewsRepository : INewsRepository
    {
        private readonly ApplicationDbContext _context;
        public NewsRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<News> CreateAsync(News newModel)
        {
            await _context.News.AddAsync(newModel);
            await _context.SaveChangesAsync();
            return newModel;
        }

        public async Task<News?> DeleteAsync(int id)
        {
            var news = await _context.News.FirstOrDefaultAsync(n => n.Id == id);
            if (news == null)
            {
                return null;
            }
            _context.News.Remove(news);
            await _context.SaveChangesAsync();
            return news;
        }

        public async Task<List<News>> GetAllAsync()
        {
            return await _context.News.ToListAsync();
        }

        public async Task<News?> GetByIdAsync(int id)
        {
            var news = await _context.News.FirstOrDefaultAsync(n => n.Id == id);
            if(news == null)
            {
                return null;
            }

            return news;
        }

        public async Task<News?> UpdateAsync(int id, News newModel)
        {
            var news = await _context.News.FirstOrDefaultAsync(n => n.Id == id);
            if(news == null)
            {
                return null;
            }

            news.Title = newModel.Title;
            news.Content = newModel.Content;
            news.ImageUrl = newModel.ImageUrl;
            news.GradeId = newModel.GradeId;

            await _context.SaveChangesAsync();
            return news;
        }
    }
}