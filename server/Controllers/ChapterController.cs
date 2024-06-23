using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
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
        private readonly IChapterRepository _chapterRepo;
        private readonly ICourseRepository _courseRepo;
        public ChapterController(IChapterRepository chappterRepo, ICourseRepository courseRepo)
        {
            _chapterRepo = chappterRepo;
            _courseRepo = courseRepo;
        }

        [HttpGet("get-all")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAll()
        {
            var chapters = await _chapterRepo.GetAllAsync();
            var chapterDto = chapters.Select(c => c.ToChapterDto());
            return Ok(chapterDto);
        }

        [HttpGet("get-by-id/{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetById(int id)
        {
            var chapter = await _chapterRepo.GetByIdAsync(id);
            if (chapter == null)
            {
                return NotFound();
            }

            return Ok(chapter.ToChapterDto());
        }

        [HttpPost("create")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create(CreateChapterDto chapterDto)
        {
            if (!await _courseRepo.CourseExists(chapterDto.CourseId))
            {
                return BadRequest("Khóa học không tồn tại");
            }

            var chapter = chapterDto.ToChapterFromCreate();
            await _chapterRepo.CreateAsync(chapter);
            return CreatedAtAction(nameof(GetById), new { id = chapter.Id }, chapter.ToChapterDto());
        }

        [HttpPut("update-order/{courseId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateOrder(int courseId, [FromBody] List<ChapterOrder> chapters)
        {
            await _chapterRepo.UpdateChapterOrderAsync(courseId, chapters.ToChapterOrder());
            return Ok();
        }


        [HttpPut("update/{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(int id, UpdateChapterDto chapterDto)
        {
            if (!await _courseRepo.CourseExists(chapterDto.CourseId))
            {
                return BadRequest("Khóa học không tồn tại");
            }

            var chapter = await _chapterRepo.UpdateAsync(id, chapterDto.ToChapterFromUpdate());
            if (chapter == null)
            {
                return NotFound();
            }

            return Ok(chapter.ToChapterDto());
        }

        [HttpDelete("delete/{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            var chapter = await _chapterRepo.DeleteAsync(id);

            if (chapter == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}