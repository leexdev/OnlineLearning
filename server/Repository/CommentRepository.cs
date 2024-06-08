using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices.Marshalling;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using server.Data;
using server.Dtos.Comment;
using server.Dtos.User;
using server.Interfaces;
using server.Models;

namespace server.Repository
{
    public class CommentRepository : ICommentRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;
        public CommentRepository(ApplicationDbContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }
        public async Task<Comment> CreateAsync(Comment commentModel)
        {
            await _context.Comments.AddAsync(commentModel);
            await _context.SaveChangesAsync();
            return commentModel;
        }

        public async Task<Comment?> DeleteAsync(int id)
        {
            var comment = await _context.Comments.FirstOrDefaultAsync(c => c.Id == id);
            if (comment == null)
            {
                return null;
            }
            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();
            return comment;
        }

        public async Task<List<Comment>> GetAllAsync()
        {

            return await _context.Comments.Include(c => c.User).ToListAsync();
        }

        public async Task<Comment?> GetByIdAsync(int id)
        {
            var comment = await _context.Comments.Include(c => c.User).OrderByDescending(c => c.CreatedAt).FirstOrDefaultAsync(c => c.Id == id);
            if (comment == null)
            {
                return null;
            }

            return comment;
        }

        public async Task<List<Comment>> GetByLessonId(int lessonId, int page = 1, int pageSize = 10)
        {
            var comments = await _context.Comments
                .Include(c => c.User)
                .Where(c => c.LessonId == lessonId)
                .OrderByDescending(c => c.CreatedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return comments;
        }

        public async Task<Comment?> UpdateAsync(int id, Comment commentModel)
        {
            var comment = await _context.Comments.FirstOrDefaultAsync(c => c.Id == id);
            if (comment == null)
            {
                return null;
            }

            comment.Content = commentModel.Content;
            await _context.SaveChangesAsync();
            return comment;
        }
    }
}