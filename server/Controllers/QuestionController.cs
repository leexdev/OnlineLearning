using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using server.Dtos.Question;
using server.Interfaces;
using server.Mappers;

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
        public async Task<IActionResult> Create(CreateQuestionDto questionDto)
        {
            if (!await _lessonRepo.LessonExists(questionDto.LessonId))
            {
                return NotFound("Bài giảng không tồn tại");
            }
            var question = questionDto.ToQuestionFromCreate();
            await _questionRepo.CreateAsync(question);
            return CreatedAtAction(nameof(GetById), new { id = question.Id }, question.ToQuestionDto());
        }

        [HttpPut("update/{id:int}")]
        public async Task<IActionResult> Update(int id, UpdateQuestionDto questionDto)
        {
            if (!await _lessonRepo.LessonExists(questionDto.LessonId))
            {
                return NotFound("Bài giảng không tồn tại");
            }

            var question = await _questionRepo.UpdateAsync(id, questionDto.ToQuestionFromUpdate());
            if (question == null)
            {
                return NotFound();
            }

            return Ok(question.ToQuestionDto());
        }

        [HttpDelete("delete/{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var question = await _questionRepo.DeleAsync(id);
            if (question == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}