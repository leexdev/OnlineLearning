using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using server.Dtos.Question;
using server.Dtos.UserAnswerHistory;
using server.Extensions;
using server.Interfaces;
using server.Mappers;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuestionController : ControllerBase
    {
        private readonly IQuestionRepository _questionRepo;
        private readonly ILessonRepository _lessonRepo;

        public QuestionController(IQuestionRepository questionRepo, ILessonRepository lessonRepo)
        {
            _questionRepo = questionRepo;
            _lessonRepo = lessonRepo;
        }

        [HttpGet("get-all")]
        public async Task<IActionResult> GetAll()
        {
            var questions = await _questionRepo.GetAllAsync();
            var questionDto = questions.Select(q => q.ToQuestionDto());
            return Ok(questionDto);
        }

        [HttpGet("get-by-lessonid/{lessonId:int}")]
        public async Task<IActionResult> GetByLessonId(int lessonId)
        {
            var questions = await _questionRepo.GetByLessonId(lessonId);
            var questionDto = questions.Select(q => q.ToQuestionDto());
            return Ok(questionDto);
        }

        [HttpGet("get-by-course-id/{courseId:int}")]
        public async Task<IActionResult> GetByCourseId(int courseId)
        {
            var questions = await _questionRepo.GetByCourseIdAsync(courseId);
            var questionDtos = questions.Select(q => q.ToQuestionDto());
            return Ok(questionDtos);
        }

        [HttpGet("get-by-id/{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var question = await _questionRepo.GetByIdAsync(id);
            if (question == null)
            {
                return NotFound();
            }
            return Ok(question.ToQuestionDto());
        }

        [HttpPost("create")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateQuestionWithAnswers(CreateQuestionDto questionDto)
        {
            if (!await _lessonRepo.LessonExists(questionDto.LessonId))
            {
                return NotFound("Bài giảng không tồn tại");
            }

            var question = questionDto.ToQuestionFromCreate();

            var createdQuestion = await _questionRepo.AddQuestionWithAnswers(question);
            return CreatedAtAction(nameof(GetById), new { id = question.Id }, createdQuestion.ToQuestionDto());
        }

        [HttpPut("update/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateQuestionWithAnswers(int id, UpdateQuestionDto questionDto)
        {
            var question = questionDto.ToQuestionFromUpdate();
            var updatedQuestion = await _questionRepo.UpdateQuestionWithAnswers(id, question);

            if (updatedQuestion == null)
            {
                return NotFound("Câu hỏi không tồn tại");
            }

            return Ok(updatedQuestion.ToQuestionDto());
        }

        [HttpDelete("delete/{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            var question = await _questionRepo.DeleteAsync(id);
            if (question == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}