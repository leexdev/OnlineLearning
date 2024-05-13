using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Google;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Services;
using Google.Apis.Upload;
using Google.Apis.Util.Store;
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
        private readonly IFireBaseService _firebaseService;
        private readonly IFileService _fileService;
        public LessonController(ILessonRepository lessonRepo, IChapterRepository chapterRepo, IFireBaseService firebaseService, IFileService fileService)
        {
            _lessonRepo = lessonRepo;
            _chapterRepo = chapterRepo;
            _firebaseService = firebaseService;
            _fileService = fileService;
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
            await _lessonRepo.CreateAsync(lesson);
            return CreatedAtAction(nameof(GetById), new { id = lesson.Id }, lesson.ToLessonDto());
        }

        // [HttpPost("uploadvideo")]
        // public async Task<IActionResult> UploadVideo(IFormFile file)
        // {
        //     var result = await _youtubeService.UploadVideoAsync(file);
        //     if (result == null)
        //     {
        //         return NotFound();
        //     }
        //     return Ok(result);
        // }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadVideo(IFormFile videoFile)
        {
            // Kiểm tra xem tệp tin được chọn không
            if (videoFile == null || videoFile.Length == 0)
                return BadRequest("Không có file nào được chọn");

            if (!_fileService.IsVideoFile(videoFile))
                return BadRequest("Dịnh dạng không phù hợp");

            var url = await _firebaseService.UploadFile(videoFile);

            return Ok(url);
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