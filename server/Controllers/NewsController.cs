using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using server.Dtos.New;
using server.Interfaces;
using server.Mappers;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NewsController : ControllerBase
    {
        private readonly INewsRepository _newsRepo;
        private readonly IGradeRepository _gradeRepo;
        public NewsController(INewsRepository newsRepo, IGradeRepository gradeRepo)
        {
            _newsRepo = newsRepo;
            _gradeRepo = gradeRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var news = await _newsRepo.GetAllAsync();
            var newsDto = news.Select(n => n.ToNewsDto());
            return Ok(newsDto);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var news = await _newsRepo.GetByIdAsync(id);
            if (news == null)
            {
                return NotFound();
            }
            return Ok(news.ToNewsDto());
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateNewsDto newsDto)
        {
            if (!await _gradeRepo.GradeExists(newsDto.GradeId))
            {
                return BadRequest("Lớp học không tồn tại");
            }
            var news = newsDto.ToNewsFromCreate();
            await _newsRepo.CreateAsync(news);
            return CreatedAtAction(nameof(GetById), new { id = news.Id }, news.ToNewsDto());
        }

        [HttpPut]
        public async Task<IActionResult> Update(int id, UpdateNewsDto newsDto)
        {
            if (!await _gradeRepo.GradeExists(newsDto.GradeId))
            {
                return BadRequest("Lớp học không tồn tại");
            }

            var news = await _newsRepo.UpdateAsync(id, newsDto.ToNewsFromUpdate());
            if (news == null)
            {
                return NotFound();
            }
            return Ok(news.ToNewsDto());
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var news = await _newsRepo.DeleteAsync(id);

            if (news == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}