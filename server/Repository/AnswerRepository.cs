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
    public class AnswerRepository : IAnswerRepository
    {
        private readonly ApplicationDbContext _context;
        public AnswerRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Answer> CreateAsync(Answer answerModel)
        {
            await _context.Answers.AddAsync(answerModel);
            await _context.SaveChangesAsync();
            return answerModel;
        }

        public async Task<Answer?> DeleteAsync(int id)
        {
            var answer = await _context.Answers.FirstOrDefaultAsync(a => a.Id == id);
            if (answer == null)
            {
                return null;
            }

            return answer;
        }

        public async Task<List<Answer>> GetAllAsync()
        {
            return await _context.Answers.ToListAsync();
        }

        public async Task<Answer?> GetByIdAsync(int id)
        {
            var answer = await _context.Answers.FirstOrDefaultAsync(a => a.Id == id);
            if (answer == null)
            {
                return null;
            }

            return answer;

        }

        public async Task<Answer?> UpdateAsync(int id, Answer answerModel)
        {
            var answer = await _context.Answers.FirstOrDefaultAsync(a => a.Id == id);
            if (answer == null)
            {
                return null;
            }

            answer.Content = answerModel.Content;
            answer.IsCorrect = answerModel.IsCorrect;
            answer.QuestionId = answer.QuestionId;
            await _context.SaveChangesAsync();
            return answer;
        }
    }
}