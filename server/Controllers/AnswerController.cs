using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using server.Dtos.Answer;
using server.Interfaces;
using server.Mappers;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AnswerController : ControllerBase
    {
        private readonly IAnswerRepository _answerRepo;
        private readonly IQuestionRepository _questionRepo;
        public AnswerController(IAnswerRepository answerRepo, IQuestionRepository questionRepo)
        {
            _answerRepo = answerRepo;
            _questionRepo = questionRepo;
        }

        [HttpGet("get-all")]
        public async Task<IActionResult> GetAll()
        {
            var answers = await _answerRepo.GetAllAsync();
            var answerDto = answers.Select(a => a.ToAnswerDto());
            return Ok(answerDto);
        }

        [HttpGet("get-by-id")]
        public async Task<IActionResult> GetById(int id)
        {
            var answer = await _answerRepo.GetByIdAsync(id);
            if (answer == null)
            {
                return NotFound();
            }

            return Ok(answer.ToAnswerDto());
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create(CreateAnswerDto answerDto)
        {
            if (!await _questionRepo.QuestionExists(answerDto.QuestionId))
            {
                return NotFound("Câu hỏi không tồn tại");
            }

            var answer = answerDto.ToAnswerFromCreate();
            await _answerRepo.CreateAsync(answer);
            return CreatedAtAction(nameof(GetById), new { id = answer.Id }, answer.ToAnswerDto());
        }

        [HttpPut("update/{id:int}")]
        public async Task<IActionResult> Update(int id, UpdateAnswerDto answerDto)
        {
            if (!await _questionRepo.QuestionExists(answerDto.QuestionId))
            {
                return NotFound("Câu hỏi không tồn tại");
            }

            var answer = await _answerRepo.UpdateAsync(id, answerDto.ToAnswerFromUpdate());
            if (answer == null)
            {
                return NotFound();
            }

            return Ok(answer.ToAnswerDto());
        }

        [HttpPut("delete/{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var answer = await _answerRepo.DeleteAsync(id);
            if (answer == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}