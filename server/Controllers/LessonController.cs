using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using server.Dtos.Lesson;
using server.Interfaces;
using server.Mappers;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LessonController : ControllerBase
    {
        private readonly ILessonRepository _lessonRepo;
        private readonly IChapterRepository _chapterRepo;
        public LessonController(ILessonRepository lessonRepo, IChapterRepository chapterRepo)
        {
            _lessonRepo = lessonRepo;
            _chapterRepo = chapterRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var lessons = await _lessonRepo.GetAllAsync();
            var lessonDto = lessons.Select(l => l.ToLessonDto());
            return Ok(lessonDto);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var lesson = await _lessonRepo.GetByIdAsync(id);
            if (lesson == null)
            {
                return NotFound();
            }

            return Ok(lesson.ToLessonDto());
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateLessonDto lessonDto)
        {
            if (!await _chapterRepo.ChapterExist(lessonDto.ChapterId))
            {
                return NotFound("Chương không tồn tại");
            }

            var lesson = lessonDto.ToLessonFromCreate();
            await _lessonRepo.CreateAsynO(lesson);
            return CreatedAtAction(nameof(GetById), new { id = lesson.Id }, lesson.ToLessonDto());
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, UpdateLessonDto lessonDto)
        {
            if (!await _chapterRepo.ChapterExist(lessonDto.ChapterId))
            {
                return NotFound("Chương không tồn tại");
            }

            var lessonModel = await _lessonRepo.UpdateAsync(id, lessonDto.ToLessonFromUpdate());
            if (lessonModel == null)
            {
                return NotFound();
            }

            return Ok(lessonModel.ToLessonDto());
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var lessonModel = await _lessonRepo.DeleteAsync(id);
            if (lessonModel == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}