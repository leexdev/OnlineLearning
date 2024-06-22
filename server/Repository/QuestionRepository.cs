using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Dtos.Question;
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
        public async Task<Question> AddQuestionWithAnswers(Question questionModel)
        {
            var question = new Question
            {
                Content = questionModel.Content,
                Explanation = questionModel.Explanation,
                LessonId = questionModel.LessonId,
                Language = questionModel.Language,
                IsPronounce = questionModel.IsPronounce,
                Answers = questionModel.Answers.Select(a => new Answer
                {
                    Content = a.Content,
                    IsCorrect = a.IsCorrect
                }).ToList()
            };

            _context.Questions.Add(question);
            await _context.SaveChangesAsync();
            return question;
        }

        public async Task<Question> UpdateQuestionWithAnswers(int id, Question questionModel)
        {
            var question = await _context.Questions
                .Include(q => q.Answers)
                .FirstOrDefaultAsync(q => q.Id == id);

            if (question == null)
            {
                return null;
            }

            question.Content = questionModel.Content;
            question.Explanation = questionModel.Explanation;
            question.LessonId = questionModel.LessonId;
            question.Language = questionModel.Language;
            question.IsPronounce = questionModel.IsPronounce;

            _context.Answers.RemoveRange(question.Answers);
            question.Answers = questionModel.Answers.Select(a => new Answer
            {
                Content = a.Content,
                IsCorrect = a.IsCorrect
            }).ToList();

            await _context.SaveChangesAsync();
            return question;
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

        public async Task<List<Question>> GetByCourseIdAsync(int courseId)
        {
            var question = await _context.Questions.Include(q => q.Lesson).ThenInclude(l => l.Chapter).Where(l => l.Lesson.Chapter.CourseId == courseId).ToListAsync();
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
    }
}