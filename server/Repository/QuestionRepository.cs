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
    public class QuestionRepository : IQuestionRepository
    {
        private readonly ApplicationDbContext _context;
        public QuestionRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Question> CreateAsync(Question questionModel)
        {
            await _context.Questions.AddAsync(questionModel);
            await _context.SaveChangesAsync();
            return questionModel;
        }

        public async Task<Question?> DeleteAsync(int id)
        {
            var question = await _context.Questions.FirstOrDefaultAsync(q => q.Id == id);
            if (question == null)
            {
                return null;
            }
            _context.Questions.Remove(question);
            await _context.SaveChangesAsync();
            return question;
        }

        public async Task<List<Question>> GetAllAsync()
        {
            return await _context.Questions.Include(q => q.Answers).ToListAsync();
        }

        public async Task<Question?> GetByIdAsync(int id)
        {
            var question = await _context.Questions.Include(q => q.Answers).FirstOrDefaultAsync(q => q.Id == id);
            if (question == null)
            {
                return null;
            }
            return question;
        }

        public async Task<List<Question>> GetByLessonId(int lessonId)
        {
            return await _context.Questions.Include(q => q.Answers).Where(q => q.LessonId == lessonId).ToListAsync();
        }

        public async Task<bool> QuestionExists(int id)
        {
            return await _context.Questions.AnyAsync(q => q.Id == id);
        }

        public async Task<Question?> UpdateAsync(int id, Question questionModel)
        {
            var question = await _context.Questions.FirstOrDefaultAsync(q => q.Id == id);
            if (question == null)
            {
                return null;
            }
            question.Content = questionModel.Content;
            question.Explanation = questionModel.Explanation;
            question.LessonId = questionModel.LessonId;
            await _context.SaveChangesAsync();
            return question;
        }
    }
}