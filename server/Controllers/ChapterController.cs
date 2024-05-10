using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using server.Dtos.Chapter;
using server.Interfaces;
using server.Mappers;
using server.Repository;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChapterController : ControllerBase
    {
        private readonly IChapterRepository _chappterRepo;
        private readonly ICourseRepository _courseRepo;
        public ChapterController(IChapterRepository chappterRepo, ICourseRepository courseRepo)
        {
            _chappterRepo = chappterRepo;
            _courseRepo = courseRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var chapters = await _chappterRepo.GetAllAsync();
            var chapterDto = chapters.Select(c => c.ToChapterDto());
            return Ok(chapterDto);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var chapter = await _chappterRepo.GetByIdAsync(id);
            if (chapter == null)
            {
                return NotFound();
            }

            return Ok(chapter.ToChapterDto());
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateChapterDto chapterDto)
        {
            if (!await _courseRepo.CourseExists(chapterDto.CourseId))
            {
                return BadRequest("Khóa học không tồn tại");
            }

            var chapter = chapterDto.ToChapterFromCreate();
            await _chappterRepo.CreateAsync(chapter);
            return CreatedAtAction(nameof(GetById), new { id = chapter.Id }, chapter.ToChapterDto());
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, UpdateChapterDto chapterDto)
        {
            if (!await _courseRepo.CourseExists(chapterDto.CourseId))
            {
                return BadRequest("Khóa học không tồn tại");
            }

            var chapter = await _chappterRepo.UpdateAsync(id, chapterDto.ToChapterFromUpdate());
            if (chapter == null)
            {
                return NotFound();
            }

            return Ok(chapter.ToChapterDto());
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var chapter = await _chappterRepo.DeleteAsync(id);

            if (chapter == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}